import request from '../request';
import { NewResponse } from '../request/types';

export const uploadFile = (file: File): Promise<NewResponse<string>> =>
  request.post(
    '/file/upload',
    { file },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
