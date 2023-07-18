import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  upload(file: any) {
    return 'This action adds a new upload';
  }

  uploads(file: any) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
