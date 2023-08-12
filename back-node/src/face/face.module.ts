import { Module, forwardRef } from '@nestjs/common';
import { FaceService } from './face.service';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
import { FaceController } from './face.controller';

@Module({
  imports: [UserModule, forwardRef(() => RoleModule)],
  providers: [FaceService],
  exports: [FaceService],
  controllers: [FaceController],
})
export class FaceModule {}
