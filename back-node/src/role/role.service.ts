import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleMessage } from './constant';
import { UserService } from 'src/user/user.service';
import { FaceService } from 'src/face/face.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => FaceService))
    private readonly faceService: FaceService
  ) {}

  /**
   * 创建角色
   * @param createRoleDto 角色信息
   */
  async create(createRoleDto: CreateRoleDto) {
    await this.checkUnique(createRoleDto.name);
    const role = await this.roleRepository.save(createRoleDto);
    await this.faceService.addGroup(role.id);
    return role;
  }

  /**
   * 获取所有角色
   * @returns 角色列表
   */
  async findAll() {
    return await this.roleRepository.find({ order: { id: 'ASC' } });
  }

  /**
   * 根据ID获取指定角色
   * @param id 角色ID
   * @returns 角色
   */
  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role)
      throw new HttpException(RoleMessage.NOT_FOUND, HttpStatus.BAD_REQUEST);
    return role;
  }

  /**
   * 更新指定角色
   * @param id 角色ID
   * @param updateRoleDto 角色信息
   */
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    await this.checkUnique(updateRoleDto.name);
    return await this.roleRepository.save({ ...role, ...updateRoleDto });
  }

  /**
   * 删除指定角色
   * @param id 角色ID
   */
  async remove(id: number) {
    const users = await this.findUsers(id);
    if (users.length) {
      throw new HttpException(
        RoleMessage.STILL_HAS_USERS,
        HttpStatus.BAD_REQUEST
      );
    }
    const { affected } = await this.roleRepository.delete({ id });
    if (affected === 0) {
      throw new HttpException(RoleMessage.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    await this.faceService.deleteGroup(id);
  }

  /**
   * 检查名称唯一性
   * @param name 名称
   */
  async checkUnique(name: string) {
    if (!name) {
      throw new HttpException(
        RoleMessage.NOT_ALLOWED_EMPTY,
        HttpStatus.BAD_REQUEST
      );
    }
    const role = await this.roleRepository.findOne({ where: { name } });
    if (role) {
      throw new HttpException(
        `"${role.name}"${RoleMessage.ALREADY_EXISTS}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**
   * 查询角色下的所有用户
   * @param id 角色ID
   * @returns 用户列表
   */
  async findUsers(id: number) {
    await this.findOne(id);
    const users = await this.userService.findBy('role', id);
    return users;
  }
}
