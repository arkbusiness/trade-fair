import { AxiosRequestConfig } from 'axios';
import { serverAxios } from './server-axios.lib';

export const serverFetcher = async <T>(
  options: AxiosRequestConfig
): Promise<T> => {
  const res = await serverAxios({
    ...options
  });
  return res.data;
};
