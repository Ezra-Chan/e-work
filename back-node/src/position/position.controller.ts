import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('职位')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @ApiOperation({ summary: '创建职位' })
  @ApiBody({ type: CreatePositionDto, description: '职位信息' })
  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @ApiOperation({ summary: '获取所有职位' })
  @Get()
  findAll() {
    return this.positionService.findAll();
  }

  @ApiOperation({ summary: '获取指定职位' })
  @ApiParam({ name: 'id', description: '职位ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @ApiOperation({ summary: '更新指定职位' })
  @ApiParam({ name: 'id', description: '职位ID' })
  @ApiBody({ type: UpdatePositionDto, description: '职位信息' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto
  ) {
    return this.positionService.update(+id, updatePositionDto);
  }

  @ApiOperation({ summary: '删除指定职位' })
  @ApiParam({ name: 'id', description: '职位ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}
