import { Module } from '@nestjs/common';
import { FaceService } from './face.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [FaceService],
  exports: [FaceService],
})
export class FaceModule {}
