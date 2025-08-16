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
    contactPhone: string;
    companyName: string;
    country: string;
    password: string;
    contactName: string;
    adminUsername: string;
  }): AxiosRequestConfig => ({
    url: `/organizer/register/${data.token}`,
    method: 'POST',
    data
  }),
  onboarding: (data: {
    eventName: string;
    venueName: string;
    eventStartDate: string;
    eventEndDate: string;
  }): AxiosRequestConfig => ({
    url: '/organizer/onboarding',
    method: 'PATCH',
    data
  })
};
