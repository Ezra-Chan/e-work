import { IsNotEmpty } from 'class-validator';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { FaceDesc } from 'src/utils/entitiesDescription';

export class CreateFaceDto {
  @ApiPropertyDesc(FaceDesc)
  @IsNotEmpty({ message: '图片不能为空' })
  base: string;

  @ApiPropertyDesc(FaceDesc, { required: false })
  userId?: number;

  @ApiPropertyDesc(FaceDesc, { required: false })
  roleId?: number;
}
