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
    firstName: string;
    lastName: string;
    department: string;
    phone: string;
  }): AxiosRequestConfig => ({
    url: `/organizer/update-profile`,
    method: 'PATCH',
    data
  })
};
