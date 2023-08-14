import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { relative, join } from 'path';

@Injectable()
export class UploadService {
  upload(file: Express.Multer.File) {
    file.path = this.getRelativePath(file.path.replace(/\\/g, '/'));
    const { originalname, path, size, fieldname, mimetype, filename } = file;
    return {
      fieldname,
      filename,
      mimetype,
      originalname,
      path,
      size,
    };
  }

  uploads(files: Express.Multer.File[]) {
    return files.map(file => {
      return this.upload(file);
    });
  }

  findAll() {
    return `This action returns all upload`;
  }

  download(path: string, res: Response) {
    const url = join(__dirname, '../', path);
    res.download(url);
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }

  getRelativePath(filePath: string) {
    return relative(join(__dirname, '../'), filePath);
  }
}
