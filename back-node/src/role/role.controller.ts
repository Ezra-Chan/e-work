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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '创建角色' })
  @ApiBody({ type: CreateRoleDto, description: '角色信息' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: '获取所有角色' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: '获取指定角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: '更新指定角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiBody({ type: UpdateRoleDto, description: '角色信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: '删除指定角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }

  @ApiOperation({ summary: '查询角色下的所有用户' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @Get(':id/users')
  findUsers(@Param('id') id: string) {
    return this.roleService.findUsers(+id);
  }
}
