import { AxiosRequestConfig } from 'axios';
import { IAttendeeRequestOtpFormValues } from '../presentation/organisms';

type AttendeeVerifyOtpFormValues = {
  interest?: string[];
  email: string;
  inviteCode: string;
  otp: string;
  username: string;
  pin: string;
  address: string;
  firstName: string;
  lastName: string;
  currency: string;
};

export const attendeeOnboardingService = {
  requestOtp: (data: IAttendeeRequestOtpFormValues): AxiosRequestConfig => ({
    url: '/attendee/request-otp',
    method: 'POST',
    data
  }),
  verifyOtp: (data: AttendeeVerifyOtpFormValues): AxiosRequestConfig => ({
    url: '/attendee/verify-otp',
    method: 'POST',
    data
  })
};
