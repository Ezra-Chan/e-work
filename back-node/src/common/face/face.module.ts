import { Module } from '@nestjs/common';
import { FaceService } from './face.service';

@Module({
  providers: [FaceService],
  exports: [FaceService],
})
export class FaceModule {}
