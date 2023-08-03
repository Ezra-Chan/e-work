import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { DepartmentMessage } from './constant';
import { UserService } from 'src/user/user.service';
import type { DepartmentTree, FindAllUsersOptions } from './department.d';

const managerSelect = [
  'department',
  'parent',
  'manager.id',
  'manager.realName',
  'manager.avatar',
  'manager.loginName',
  'parent.id',
  'parent.name',
];

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @Inject(forwardRef(() => UserService))
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
    return await this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.manager', 'manager')
      .leftJoinAndSelect('department.parent', 'parent')
      .select(managerSelect)
      .orderBy('department.id', 'ASC')
      .getMany();
  }

  /**
   * 获取所有部门，树形展示
   * @returns 部门列表
   */
  async findAllTree() {
    const departments = (await this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.manager', 'manager')
      .leftJoinAndSelect('department.parent', 'parent')
      .select(managerSelect)
      .orderBy('department.id', 'ASC')
      .where('department.parent is null')
      .getMany()) as DepartmentTree[];
    for (let i = 0; i < departments.length; i++) {
      const dept = departments[i];
      // 递归查询子部门
      departments[i] = await this.findAllChildren(+dept.id, dept);
    }
    return departments;
  }

  async findAllChildren(
    id: number,
    department?: Department
  ): Promise<DepartmentTree> {
    if (!department) {
      department = await this.findOne(id);
    }
    const children = await this.findChildren(id, department);
    for (let i = 0; i < children.length; i++) {
      const dept = children[i];
      // 递归查询子部门
      children[i] = await this.findAllChildren(+dept.id, dept);
    }
    return {
      ...department,
      children,
    };
  }

  /**
   * 获取指定部门
   * @param id 部门ID
   * @returns 部门
   */
  async findOne(id: number) {
    const department = await this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.manager', 'manager')
      .leftJoinAndSelect('department.parent', 'parent')
      .select(managerSelect)
      .orderBy('department.id', 'ASC')
      .where('department.id = :id', { id })
      .getOne();
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
    return await this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.manager', 'manager')
      .leftJoinAndSelect('department.parent', 'parent')
      .select(managerSelect)
      .orderBy('department.id', 'ASC')
      .where('department.parent = :id', { id })
      .getMany();
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

  /**
   * 获取部门路径数组
   * @param id 部门ID
   * @returns 部门路径
   */
  async getDeptPath(id: number, dept?: Department, path: string[] = []) {
    if (!dept) {
      dept = await this.findOne(id);
    }
    path.unshift(dept.name);
    if (dept.parent) {
      await this.getDeptPath(+dept.parent.id, undefined, path);
    }
    return path;
  }

  /**
   * 获取部门路径字符串
   * @param id 部门ID
   * @returns 部门路径
   */
  async getDeptPathString(id: number) {
    if (!id) return '-';
    const path = await this.getDeptPath(id);
    return path.join('/');
  }
}
