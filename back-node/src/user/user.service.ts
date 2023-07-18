import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDesc } from 'src/utils/entitiesDescription';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  async register(createUserDto: CreateUserDto) {
    const uniqueFields = ['loginName', 'phoneNumber', 'idCard', 'bankCard'];
    for await (const field of uniqueFields) {
      await this.checkUnique(field, createUserDto[field]);
    }
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  /**
   * 获取所有用户信息
   * @returns 用户列表
   */
  findAll() {
    return this.userRepository.find({ select: ['id', 'realName'] });
  }

  /**
   * 根据某字段查找用户
   * @param field 字段名
   * @param value 字段值
   * @returns 用户
   */
  async findOneBy(field: string, value: string) {
    return await this.userRepository.findOneBy({ [field]: value });
  }

  /**
   * 检查字段唯一性
   * @param field 字段名
   * @param value 字段值
   * @returns
   */
  async checkUnique(field: string, value: string) {
    const user = await this.userRepository.findOneBy({ [field]: value });
    if (user) {
      throw new HttpException(
        `${UserDesc[field] ?? field}已存在`,
        HttpStatus.BAD_REQUEST
      );
    }
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
