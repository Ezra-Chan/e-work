import { Module } from '@nestjs/common';
import { NationService } from './nation.service';
import { NationController } from './nation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nation } from './entities/nation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nation])],
  controllers: [NationController],
  providers: [NationService],
})
export class NationModule {}
