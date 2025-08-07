import { AxiosError } from 'axios';

export const errorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response && error.response?.data) {
      return error.response?.data?.message || 'An error occurred';
    }
  }

  if (error instanceof Error) {
    return error?.message || 'An error occurred';
  }
  return 'An error occured';
};
