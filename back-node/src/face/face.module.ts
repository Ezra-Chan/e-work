import { Module } from '@nestjs/common';
import { FaceService } from './face.service';
import { UserModule } from 'src/user/user.module';
import { FaceController } from './face.controller';

@Module({
  imports: [UserModule],
  providers: [FaceService],
  exports: [FaceService],
  controllers: [FaceController],
})
export class FaceModule {}
