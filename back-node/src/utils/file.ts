import * as fs from 'fs';
import { join } from 'path';

/**
 * 检查文件夹是否存在，不存在则创建
 * @param filePath 文件路径
 */
export const checkDirAndCreate = (filePath: string) => {
  const pathArr = filePath.split('/');
  let checkPath = join(__dirname, '../');
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};
