import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { DepartmentMessage } from './constant';
import { UserService } from 'src/user/user.service';
import type { DepartmentTree, FindAllUsersOptions } from './department.d';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private readonly userService: UserService
  ) {}

  /**
   * 创建部门
   * @param createDepartmentDto 部门信息
   * @returns 部门
   */
  async create(createDepartmentDto: CreateDepartmentDto) {
    await this.checkUnique(createDepartmentDto.name);
    return await this.departmentRepository.save(createDepartmentDto);
  }

  /**
   * 获取所有部门
   * @returns 部门列表
   */
  async findAll() {
    return await this.departmentRepository.find({ order: { id: 'ASC' } });
  }

  /**
   * 获取指定部门
   * @param id 部门ID
   * @returns 部门
   */
  async findOne(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['manager'],
    });
    if (!department) {
      throw new HttpException(
        DepartmentMessage.NOT_FOUND,
        HttpStatus.BAD_REQUEST
      );
    }
    return department;
  }

  /**
   * 更新指定部门
   * @param id 部门ID
   * @param updateDepartmentDto 部门信息
   * @returns 部门
   */
  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.findOne(id);
    await this.checkUnique(updateDepartmentDto.name);
    return await this.departmentRepository.save({
      ...department,
      ...updateDepartmentDto,
    });
  }

  /**
   * 删除指定部门
   * @param id 部门ID
   */
  async remove(id: number) {
    const { affected } = await this.departmentRepository.delete({ id });
    if (!affected)
      throw new HttpException(
        DepartmentMessage.NOT_FOUND,
        HttpStatus.BAD_REQUEST
      );
  }

  /**
   * 检查部门名称唯一性
   * @param name 部门名称
   * @returns
   */
  async checkUnique(name: string) {
    if (!name) {
      throw new HttpException(
        DepartmentMessage.NOT_ALLOWED_EMPTY,
        HttpStatus.BAD_REQUEST
      );
    }
    const department = await this.departmentRepository.findOne({
      where: { name },
    });
    if (department) {
      throw new HttpException(
        `'${name}'${DepartmentMessage.ALREADY_EXISTS}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**
   * 根据部门ID或部门查询所有子部门
   * @param id 部门ID
   * @param department 部门
   * @returns 部门列表
   */
  async findChildren(id: number): Promise<Department[]>;
  async findChildren(id: number, department: Department): Promise<Department[]>;
  async findChildren(id: number, department?: Department) {
    if (!department) {
      department = await this.findOne(id);
    }
    return await this.departmentRepository.find({
      where: { parent: department },
      order: { id: 'ASC' },
      relations: ['manager'],
    });
  }

  /**
   * 查询部门下的所有用户
   * @param id 部门ID
   * @returns 用户列表
   */
  async findUsers(id: number): Promise<DepartmentTree>;
  async findUsers(
    id: number,
    options: FindAllUsersOptions
  ): Promise<DepartmentTree>;
  async findUsers(
    id: number,
    options: FindAllUsersOptions,
    department: Department
  ): Promise<DepartmentTree>;
  async findUsers(
    id: number,
    options: FindAllUsersOptions = {},
    department?: Department
  ) {
    if (!department) {
      department = await this.findOne(id);
    }
    const { lazy, flat } = options;
    let users = await this.userService.findBy('department', id);
    const children = await this.findChildren(id, department);
    if (!lazy) {
      for (let i = 0; i < children.length; i++) {
        const dept = children[i];
        // 递归查询子部门下的用户
        children[i] = await this.findUsers(+dept.id, options, dept);
        if (flat) {
          // 如果是扁平化查询，则将子部门的用户合并到当前部门的用户列表中
          users = users.concat((children[i] as DepartmentTree).users);
        }
      }
    }
    return {
      ...department,
      id: +department.id,
      users,
      children: flat ? undefined : children,
    };
  }
}
