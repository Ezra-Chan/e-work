import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './file.service';
import { Response } from 'express';

@ApiTags('上传文件')
@Controller('file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '上传单个文件' })
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploads(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file);
  }

  @ApiOperation({ summary: '上传多个文件' })
  @ApiConsumes('multipart/form-data')
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('file'))
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploads(files);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @ApiOperation({ summary: '下载文件' })
  @Post('export')
  download(@Body('path') path: string, @Res() res: Response) {
    return this.uploadService.download(path, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
