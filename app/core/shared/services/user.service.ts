import { AxiosRequestConfig } from 'axios';

export const userService = {
  getUser: () => ({
    url: '/me',
    queryKey: ['me']
  }),
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): AxiosRequestConfig => ({
    url: `/change-password`,
    method: 'POST',
    data
  }),
  updateUser: (data: {
    firstName: string;
    lastName: string;
    department: string;
    phone: string;
  }): AxiosRequestConfig => ({
    url: `/update-profile`,
    method: 'PATCH',
    data
  })
};
