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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @ApiBody({ type: CreateUserDto, description: '用户信息' })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: '检查字段唯一性' })
  @ApiBody({ description: '字段名和值' })
  @Post('checkUnique')
  checkUnique(@Body() body: { field: string; value: string }) {
    return this.userService.checkUnique(body.field, body.value);
  }

  @ApiOperation({ summary: '获取所有用户信息' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '模糊搜索用户' })
  @ApiParam({ name: 'keyword', description: '关键词' })
  @Get('search/:keyword')
  search(@Param('keyword') keyword: string) {
    return this.userService.search(keyword);
  }

  @ApiOperation({ summary: '获取指定用户信息' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '更新指定用户信息' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiBody({ type: UpdateUserDto, description: '用户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '删除指定用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({ summary: '启用/禁用用户账号' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @Get('disable/:id')
  disable(@Param('id') id: string) {
    return this.userService.disable(+id);
  }
}
