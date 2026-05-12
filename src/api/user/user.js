import request from '../request';

export const loginAPI = (data) => {
  return request.post('/api/v1/auth/login', data);
};

export const registerAPI = (data) => {
  return request.post('/api/v1/auth/register', data);
};

export const logoutAccount = async () => {
  return request.post('/api/v1/auth/logout');
};
