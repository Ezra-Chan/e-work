import { IsNotEmpty, Length } from 'class-validator';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { RoleDesc } from 'src/utils/entitiesDescription';

export class CreateRoleDto {
  @ApiPropertyDesc(RoleDesc, { example: '管理员' })
  @IsNotEmpty({ message: '角色名不能为空' })
  @Length(2, 50, { message: '角色名长度为2-50个字符' })
  name: string;
}
