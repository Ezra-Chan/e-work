import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('部门')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({ summary: '创建部门' })
  @ApiBody({ type: CreateDepartmentDto, description: '部门信息' })
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @ApiOperation({ summary: '获取所有部门，树形展示' })
  @Get('tree')
  findAllTree() {
    return this.departmentService.findAllTree();
  }

  @ApiOperation({ summary: '获取所有部门，平铺展示' })
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @ApiOperation({ summary: '获取指定部门' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @ApiOperation({ summary: '更新指定部门' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @ApiBody({ type: UpdateDepartmentDto, description: '部门信息' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @ApiOperation({ summary: '删除指定部门' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }

  @ApiOperation({ summary: '查询部门下的所有用户，包含子部门及子部门用户' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @Get(':id/users')
  async findUsers(@Param('id') id: string) {
    return await this.departmentService.findUsers(+id);
  }

  @ApiOperation({ summary: '查询部门下的所有用户，平铺展示' })
  @ApiParam({ name: 'id', description: '部门ID' })
  @Get(':id/users/flat')
  async findUsersFlat(@Param('id') id: string) {
    return await this.departmentService.findUsers(+id, { flat: true });
  }

  @ApiOperation({
    summary: '查询部门下的所有用户，包含子部门，不包含子部门的用户',
  })
  @ApiParam({ name: 'id', description: '部门ID' })
  @Get(':id/users/lazy')
  async findUsersLazy(@Param('id') id: string) {
    return await this.departmentService.findUsers(+id, { lazy: true });
  }
}
