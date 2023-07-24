import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { DepartmentDesc } from 'src/utils/entitiesDescription';

export class CreateDepartmentDto {
  @ApiPropertyDesc(DepartmentDesc, { example: '技术部' })
  @IsNotEmpty({ message: '部门名不能为空' })
  @Length(2, 50, { message: '部门名长度为2-50个字符' })
  name: string;

  @ApiPropertyDesc(DepartmentDesc, { example: 1 })
  @IsOptional()
  @IsNumber()
  manager?: User;

  @ApiPropertyDesc(DepartmentDesc, { example: 1, required: false })
  @IsNumber()
  @IsOptional()
  parent?: Department;

  @ApiPropertyDesc(DepartmentDesc, { example: 'xx@xx.com', required: false })
  @Validate((value: string) => {
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!reg.test(value)) {
      throw new Error('邮箱格式不正确');
    }
    return true;
  })
  email?: string;
}
