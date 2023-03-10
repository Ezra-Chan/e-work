import request from '../request';

export const getUser = () =>
  request({
    url: '/login',
    method: 'GET',
  });
