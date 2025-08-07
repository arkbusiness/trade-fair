import { AxiosRequestConfig } from 'axios';
import { clientAxios } from './client-axios.lib';

export const clientFetcher = async <T>(
  options: AxiosRequestConfig
): Promise<T> => {
  const res = await clientAxios({
    ...options
  });
  return res.data;
};
