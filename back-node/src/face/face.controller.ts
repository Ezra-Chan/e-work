import { Body, Controller, Post, Session } from '@nestjs/common';
import { FaceService } from './face.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('人脸')
@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post()
  register(@Body('base') base: string, @Session() session: any) {
    console.log(session);
    // return this.faceService.faceRegister(base, 'manager', '1');
  }
}
