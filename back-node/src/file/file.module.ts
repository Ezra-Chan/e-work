import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as dayjs from 'dayjs';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './file.service';
import { UploadController } from './file.controller';
import { ISimpleUser } from 'src/utils/types';
import { checkDirAndCreate } from 'src/utils/file';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, _, cb) => {
          const { id } = req.user as ISimpleUser;
          const filePath = `files/${id}/${dayjs().format('YYYYMM')}`;
          checkDirAndCreate(filePath);
          return cb(null, join(__dirname, '../', filePath));
        },
        filename: (_, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
