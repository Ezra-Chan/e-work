import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('部门')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * 创建部门
   * @param createDepartmentDto 部门信息
   * @returns 部门
   */
  @ApiOperation({ summary: '创建部门' })
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  /**
   * 获取所有部门
   * @returns 部门列表
   */
  @ApiOperation({ summary: '获取所有部门' })
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  /**
   * 获取指定部门
   * @param id 部门ID
   * @returns 部门
   */
  @ApiOperation({ summary: '获取指定部门' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  /**
   * 更新指定部门
   * @param id 部门ID
   * @param updateDepartmentDto 部门信息
   * @returns 部门
   */
  @ApiOperation({ summary: '更新指定部门' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  /**
   * 删除指定部门
   * @param id 部门ID
   */
  @ApiOperation({ summary: '删除指定部门' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }

  /**
   * 查询部门下的所有用户，包含子部门，以树形结构返回
   * @param id 部门ID
   * @returns 用户列表
   */
  @ApiOperation({ summary: '查询部门下的所有用户，包含子部门及子部门用户' })
  @Get(':id/users')
  async findUsers(@Param('id') id: string) {
    return await this.departmentService.findUsers(+id);
  }

  @ApiOperation({ summary: '查询部门下的所有用户，平铺展示' })
  @Get(':id/users/flat')
  async findUsersFlat(@Param('id') id: string) {
    return await this.departmentService.findUsers(+id, { flat: true });
  }

  @ApiOperation({
    summary: '查询部门下的所有用户，包含子部门，不包含子部门的用户',
  })
  @Get(':id/users/lazy')
  async findUsersLazy(@Param('id') id: string) {
    return await this.departmentService.findUsers(+id, { lazy: true });
  }
}
