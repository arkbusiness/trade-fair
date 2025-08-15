export const organizerOverviewService = {
  getMetrics: () => ({
    url: '/organizer/dashboard',
    queryKey: ['organizer-dashboard']
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
