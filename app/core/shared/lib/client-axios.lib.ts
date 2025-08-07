import axios from 'axios';
import { environment } from '../utils';
import { getCookie } from 'cookies-next';
import { COOKIE_KEYS } from '../constants/common.const';

export const clientAxios = axios.create({
  baseURL: environment.baseUrl,
  timeout: 50000 // 50 seconds
});

clientAxios.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    try {
      const accessToken = await getCookie(COOKIE_KEYS.auth.token);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        config.headers.Authorization = '';
      }
    } catch (error) {
      console.error('Failed to set auth token:', error);
    }
  }
  return config;
});
