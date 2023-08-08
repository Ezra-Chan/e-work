import { IsNotEmpty, Length } from 'class-validator';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { PositionDesc } from 'src/utils/entitiesDescription';

export class CreatePositionDto {
  @ApiPropertyDesc(PositionDesc, { example: '前端工程师' })
  @IsNotEmpty({ message: '职位名不能为空' })
  @Length(2, 50, { message: '职位名长度为2-50个字符' })
  name: string;
}
