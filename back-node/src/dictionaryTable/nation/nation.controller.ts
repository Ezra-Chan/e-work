import { Controller, Get } from '@nestjs/common';
import { NationService } from './nation.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('民族')
@Controller('nation')
export class NationController {
  constructor(private readonly nationService: NationService) {}

  @ApiOperation({ summary: '获取所有民族' })
  @Get()
  findAll() {
    return this.nationService.findAll();
  }
}
