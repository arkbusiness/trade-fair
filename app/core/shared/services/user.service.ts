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
    method: 'POST',
    data
  }),
  updateUser: (data: {
    name: string;
    phone: string;
    companyName: string;
    country: string;
    email: string;
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
