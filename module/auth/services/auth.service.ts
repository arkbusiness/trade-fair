import { AxiosRequestConfig } from 'axios';
import { ISigninFormValues } from '../sign-in/presentation/organisms/sign-in-form';

export const organizerAuthService = {
  signin: (data: ISigninFormValues): AxiosRequestConfig => ({
    url: '/organizer/login',
    method: 'POST',
    data
  }),
  register: (data: {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): AxiosRequestConfig => ({
    url: `/organizer/register/${data.token}`,
    method: 'POST',
    data
  })
  // resendOTP: (): AxiosRequestConfig => ({
  //   url: '/organizer/send-verification-code',
  //   method: 'POST',
  //   data: {}
  // }),
  // forgotPassword: (data: { email: string }): AxiosRequestConfig => ({
  //   url: '/reset-password/request',
  //   method: 'POST',
  //   data
  // }),
  // resetPassword: (data: {
  //   token: string;
  //   password: string;
  // }): AxiosRequestConfig => ({
  //   url: '/reset-password',
  //   method: 'PUT',
  //   data
  // })
};
