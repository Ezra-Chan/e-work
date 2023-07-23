import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { DepartmentMessage } from './constant';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>
  ) {}

  /**
   * 创建部门
   * @param createDepartmentDto 部门信息
   * @returns 部门
   */
  async create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  /**
   * 获取所有部门
   * @returns 部门列表
   */
  async findAll() {
    return `This action returns all department`;
  }

  /**
   * 获取指定部门
   * @param id 部门ID
   * @returns 部门
   */
  async findOne(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
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
}
