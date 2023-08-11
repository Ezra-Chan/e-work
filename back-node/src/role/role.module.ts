import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { UserModule } from 'src/user/user.module';
import { FaceModule } from 'src/face/face.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), UserModule, FaceModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
