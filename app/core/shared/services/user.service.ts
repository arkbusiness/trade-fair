import { AxiosRequestConfig } from 'axios';

export const organizerUserService = {
  getUser: () => ({
    url: '/organizer/profile',
    queryKey: ['organizer-profile']
  }),
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): AxiosRequestConfig => ({
    url: `/organizer/change-password`,
    method: 'PATCH',
    data
  }),
  updateEvent: (data: {
    eventName?: string;
    venueName?: string;
    eventStartDate?: string;
    eventEndDate?: string;
    file?: File | null;
  }): AxiosRequestConfig => ({
    url: `/organizer/onboarding`,
    method: 'PATCH',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  updateUser: (data: {
    contactName: string;
    contactPhone: string;
    companyName: string;
    country: string;
    officialEmail: string;
    file?: File | null;
  }): AxiosRequestConfig => ({
    url: `/organizer/profile`,
    method: 'PATCH',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

export const exhibitorUserService = {
  getUser: (token: string) => ({
    url: `/${token}`,
    queryKey: ['exhibitor-profile']
  })
};
