import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '注册用户' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @ApiOperation({ summary: '检查字段唯一性' })
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
  @Get('search/:keyword')
  search(@Param('keyword') keyword: string) {
    return this.userService.search(keyword);
  }

  @ApiOperation({ summary: '获取指定用户信息' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '更新指定用户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '删除指定用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}