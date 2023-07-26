import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('上传文件')
@Controller('file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '上传单个文件' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploads(@Body() body: any, @UploadedFile() file: any) {
    console.log(body, file);
    return this.uploadService.upload(file);
  }

  @ApiOperation({ summary: '上传多个文件' })
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('file'))
  upload(@Body() body: any, @UploadedFiles() file: any) {
    console.log(body, file);
    return this.uploadService.uploads(file);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @ApiOperation({ summary: '下载文件' })
  @Get('export')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
