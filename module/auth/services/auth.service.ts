import { AxiosRequestConfig } from 'axios';
import { ISigninFormValues } from '../sign-in/presentation/organisms/sign-in-form';

export const authService = {
  queryKeys: {},
  signin: (data: ISigninFormValues): AxiosRequestConfig => ({
    url: '/login',
    method: 'POST',
    data
  }),
  resendOTP: (): AxiosRequestConfig => ({
    url: '/send-verification-code',
    method: 'POST',
    data: {}
  }),
  forgotPassword: (data: { email: string }): AxiosRequestConfig => ({
    url: '/reset-password/request',
    method: 'POST',
    data
  }),
  resetPassword: (data: {
    token: string;
    password: string;
  }): AxiosRequestConfig => ({
    url: '/reset-password',
    method: 'PUT',
    data
  })
};
