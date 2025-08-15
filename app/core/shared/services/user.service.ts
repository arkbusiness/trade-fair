import { AxiosRequestConfig } from 'axios';

export const organizerUserService = {
  getUser: () => ({
    url: '/organizer/me',
    queryKey: ['organizer-me']
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
