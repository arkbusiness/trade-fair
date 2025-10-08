import { AxiosRequestConfig } from 'axios';
import { ISigninFormValues } from '../sign-in/presentation/organisms/sign-in-form';
import { IAttendeeSigninFormValues } from '../sign-in/presentation/organisms/attendee-sign-in-form';

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

export const exhibitorAuthService = {
  signin: (data: ISigninFormValues): AxiosRequestConfig => ({
    url: '/exhibitor/login',
    method: 'POST',
    data
  }),
  getOnboarding: (token: string) => ({
    url: `/exhibitor/register/${token}`,
    queryKey: ['exhibitor-onboarding', token]
  }),
  register: (data: {
    token: string;
    contactEmail: string;
    companyName: string;
    country: string;
    password: string;
    contactName: string;
    username: string;
    logo?: File | null;
  }): AxiosRequestConfig => ({
    url: `/exhibitor/register/${data.token}`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

export const attendeeAuthService = {
  signin: (data: IAttendeeSigninFormValues): AxiosRequestConfig => ({
    url: '/attendee/login',
    method: 'POST',
    data
  })
};
