import { axiosClient } from './apiClient';

export const startGoogle = async () => {
  // server will redirect; here we just navigate
  window.location.href = '/api/auth/google/start';
};

export const getUser = async () => {
  const res = await axiosClient.get('/api/auth/getUser');
  return res.data; // { user }
};

export const logout = async () => {
  await axiosClient.post('/api/auth/logout');
};

export const login = async (email, password) => {
  // kept from your pattern (if you have email/pwd path)
  const res = await axiosClient.post('/api/cms/auth/login', { email, password });
  return res.data;
};
