import request from '../request';

export const getCaptcha = () =>
  request.get('/captcha', undefined, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
    responseType: 'blob',
  });

export const accountLogin = (data: LoginFormType) =>
  request.post('/logins', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });

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
