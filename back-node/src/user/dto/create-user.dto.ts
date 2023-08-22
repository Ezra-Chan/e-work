import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { UserDesc } from 'src/utils/entitiesDescription';
import { EDUCATION, SEX } from 'src/utils/constant';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Department } from 'src/department/entities/department.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('创建用户')
export class CreateUserDto {
  @ApiPropertyDesc(UserDesc, { example: '张三' })
  @IsNotEmpty({ message: '姓名不能为空' })
  @Length(2, 50, { message: '姓名长度为2-50个字符' })
  realName: string;

  @ApiPropertyDesc(UserDesc, { example: '男' })
  @IsNotEmpty({ message: '性别不能为空' })
  @IsEnum(SEX, { message: '性别必须为男或女' })
  sex: SEX;

  @ApiPropertyDesc(UserDesc, { example: 'zhangsan' })
  @IsNotEmpty({ message: '登录名不能为空' })
  @Length(1, 50, { message: '登录名长度为1-50个字符' })
  loginName: string;

  @ApiPropertyDesc(UserDesc, { example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6)
  password: string;

  @ApiPropertyDesc(UserDesc, { example: 1 })
  @IsNotEmpty({ message: '角色不能为空' })
  @IsNumber()
  role: Role;

  @ApiPropertyDesc(UserDesc, { example: 1, required: false })
  @IsOptional()
  department?: Department;

  @ApiPropertyDesc(UserDesc, {
    example: 'http://xxx.com/xxx.png',
    required: false,
  })
  avatar?: string;

  @ApiPropertyDesc(UserDesc, { example: 'xx@xx.com', required: false })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsOptional()
  email?: string;

  @ApiPropertyDesc(UserDesc, { example: '13245678901', required: false })
  @IsOptional()
  @Validate((value: string) => {
    const reg = /^1[3456789]\d{9}$/;
    if (!reg.test(value)) {
      throw new Error('手机号格式不正确');
    }
    return true;
  })
  phoneNumber?: string;

  @ApiPropertyDesc(UserDesc, { example: '321001200001011010' })
  @IsNotEmpty({ message: '身份证号不能为空' })
  @Validate((value: string) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(value)) {
      throw new Error('身份证号格式不正确');
    }
    return true;
  })
  idCard: string;

  @ApiPropertyDesc(UserDesc, { example: '6228480402564890018' })
  @IsNotEmpty({ message: '银行卡号不能为空' })
  @Validate((value: string) => {
    const reg = /^\d{16}|\d{19}$/;
    if (!reg.test(value)) {
      throw new Error('银行卡号格式不正确');
    }
    return true;
  })
  bankCard: string;

  @ApiPropertyDesc(UserDesc, { example: '本科', required: false })
  @IsEnum(EDUCATION)
  @IsOptional()
  education?: EDUCATION;

  @ApiPropertyDesc(UserDesc, { example: 'xx大学', required: false })
  graduateSchool?: string;

  @ApiPropertyDesc(UserDesc, { example: 1, required: false })
  @IsNumber()
  @IsOptional()
  leader?: User;

  @ApiPropertyDesc(UserDesc, { example: 'xx市xx区xx街道xx号', required: false })
  address?: string;

  @ApiPropertyDesc(UserDesc, { example: '学习是进步的阶梯', required: false })
  signature?: string;
}
