'use server';

import axios from 'axios';
import { environment } from '../utils';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '../constants/common.const';

export const serverAxios = axios.create({
  baseURL: environment.baseUrl,
  timeout: 20000 // 20 seconds
});

serverAxios.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    // Only on server
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get(COOKIE_KEYS.auth.token)?.value;

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
