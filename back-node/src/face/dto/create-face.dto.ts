import { IsNotEmpty } from 'class-validator';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { FaceDesc } from 'src/utils/entitiesDescription';

export class CreateFaceDto {
  @ApiPropertyDesc(FaceDesc, { example: '管理员' })
  @IsNotEmpty({ message: '图片不能为空' })
  base: string;
}
