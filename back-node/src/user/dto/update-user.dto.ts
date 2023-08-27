import { PartialType } from '@nestjs/swagger';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { UserDesc } from 'src/utils/entitiesDescription';
import { CreateUserDto } from './create-user.dto';
import { IsDateString, IsIP, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyDesc(UserDesc, {
    example: '2023-08-03T12:44:18.500Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: '最后登录时间格式不正确' })
  lastLoginTime?: Date;

  @ApiPropertyDesc(UserDesc, { example: '127.0.0.1', required: false })
  @IsOptional()
  @IsIP('4', { message: '最后登录IP格式不正确' })
  lastLoginIp?: string;
}
