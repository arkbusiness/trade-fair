import { buildQueryParams } from '@/app/core/shared/utils';

export const boothsService = {
  getBooths: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });

    return {
      url: `/organizer/booths${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['booths', queryParams]
    };
  }
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
