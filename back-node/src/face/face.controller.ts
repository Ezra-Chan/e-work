import { Body, Controller, Post, Req } from '@nestjs/common';
import { FaceService } from './face.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ISimpleUser } from 'src/utils/types';
import { CreateFaceDto } from './dto/create-face.dto';

@ApiTags('人脸')
@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @ApiOperation({ summary: '人脸注册' })
  @ApiBody({ type: CreateFaceDto, description: '人脸信息' })
  @Post()
  register(@Body('base') base: string, @Req() req: Request) {
    return this.faceService.faceRegister(base, req.user as ISimpleUser);
  }
}
