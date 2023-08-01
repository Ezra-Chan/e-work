import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDesc } from 'src/utils/entitiesDescription';
import { decrypt } from 'src/utils/decrypt';
import { UserMessage, IUser } from './constant';
import { DepartmentService } from 'src/department/department.service';
import type { ISimpleUser } from 'src/utils/types';

const relations = {
  role: true,
  department: true,
  leader: {
    role: true,
    department: true,
  },
};

const uniqueFields = ['loginName', 'phoneNumber', 'idCard', 'bankCard'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => DepartmentService))
    private readonly departmentService: DepartmentService
  ) {}

  /**
   * 注册用户
   */
  async register(createUserDto: CreateUserDto) {
    for await (const field of uniqueFields) {
      await this.checkUnique(field, createUserDto[field]);
    }
    const decryptedPassword = decrypt(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: md5(decryptedPassword), // md5再加密
    });
    return await this.userRepository.save(newUser);
  }

  /**
   * 获取所有用户信息
   * @returns 用户列表
   */
  async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'realName', 'loginName', 'avatar', 'department', 'role'],
      relations: ['department', 'role'],
    });
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      users[index] = (await this.transformUserInfo(user, 'all')) as IUser;
    }
    return users;
  }

  /**
   * 根据某字段查找用户
   * @param field 字段名
   * @param value 字段值
   * @returns 用户
   */
  async findOneBy(field: string, value: any): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { [field]: value },
      relations,
    });
    return (await this.transformUserInfo(user, 'all')) as IUser;
  }

  /**
   * 检查字段唯一性
   * @param field 字段名
   * @param value 字段值
   * @returns
   */
  async checkUnique(field: string, value: any) {
    if (!value) return;
    if (!uniqueFields.includes(field)) {
      throw new HttpException(
        UserMessage.INVALID_FIELD,
        HttpStatus.BAD_REQUEST
      );
    }
    const user = await this.userRepository.findOneBy({ [field]: value });
    if (user) {
      throw new HttpException(
        `"${UserDesc[field] ?? field}"${UserMessage.ALREADY_EXISTS}}}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }

  /**
   * 模糊搜索用户
   * @param keyword 关键词
   * @returns 用户列表
   */
  async search(keyword: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.loginName like :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.realName like :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.phoneNumber like :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.idCard like :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.bankCard like :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }

  /**
   * 获取指定用户信息
   * @param id 用户ID
   * @returns 用户
   */
  async findOne(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations,
    });
    if (!user) {
      throw new HttpException(UserMessage.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return (await this.transformUserInfo(user, 'all')) as IUser;
  }

  /**
   * 更新指定用户信息
   * @param id 用户ID
   * @param updateUserDto 用户信息
   * @returns 用户
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    for await (const field of uniqueFields) {
      if (updateUserDto[field] && updateUserDto[field] !== user[field]) {
        await this.checkUnique(field, updateUserDto[field]);
      }
    }
    if (updateUserDto.password) {
      const decryptedPassword = decrypt(updateUserDto.password);
      updateUserDto.password = md5(decryptedPassword);
    }
    const info = await this.userRepository.save({ ...user, ...updateUserDto });
    return await this.transformUserInfo(info);
  }

  /**
   * 删除指定用户
   * @param id 用户ID
   */
  async remove(id: number) {
    const { affected } = await this.userRepository.delete(id);
    if (!affected) {
      throw new HttpException(UserMessage.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 检查用户是否被禁用
   * @param user 用户
   */
  async checkEnabled(user: User) {
    if (!user.enabled) {
      throw new HttpException(
        UserMessage.USER_DISABLED,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**
   * 启用/禁用用户
   * @param id 用户ID
   */
  async disable(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.update(id, { enabled: !user.enabled });
  }

  /**
   * 格式化用户信息
   * @param user 用户
   * @returns 用户信息
   */
  async transformUserInfo(
    user: User,
    type: 'part' | 'all' = 'part'
  ): Promise<ISimpleUser | IUser> {
    const deptName = await this.departmentService.getDeptPathString(
      user.department ? +user.department?.id : undefined
    );
    if (type === 'part') {
      return {
        id: +user.id,
        realName: user.realName,
        role: user.role,
        loginName: user.loginName,
        avatar: user.avatar,
        deptName,
      };
    } else {
      return { ...user, deptName };
    }
  }

  /**
   * 根据某外键字段查找用户
   * @param field 外键字段名 'department' | 'role' | 'leader'
   * @param value 字段值
   * @returns 用户列表
   */
  async findBy(field: 'department' | 'role' | 'leader', value: any) {
    return await this.userRepository.find({
      where: { [field]: { id: value } },
      order: { id: 'ASC' },
      select: ['id', 'realName', 'avatar', 'loginName', 'role', 'department'],
      relations: {
        role: true,
        department: true,
      },
    });
  }
}
