import axios from 'axios';
import { allowClientIdByPass } from '@/utils/auth';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

const addAuthHeaderToAxios = (authHeader) => {
  instance.defaults.headers.common['Authorization'] = authHeader;
};

instance.interceptors.request.use(
  (config) => {
    try {
      const clientRequestURL = typeof window !== 'undefined'
        ? window.location.href.split('#')[0]
        : '';
      config.headers['client_request_url'] = clientRequestURL;
      config.params = {
        ...config.params,
        ...(typeof window !== 'undefined' && !allowClientIdByPass(window.location.origin)
          ? { client_id: undefined }
          : {})
      };
    } catch (err) {
      console.log('ERROR IN REQUEST INTERCEPTOR', err);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject(err)
);

export { instance as axiosClient, addAuthHeaderToAxios };
