import request from '../request';

export const getUser = () => request.get('/login');

export const faceLogin = (base: string) =>
  request.post(
    '/faceAjax',
    { base },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }
  );
