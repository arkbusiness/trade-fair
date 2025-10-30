import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type VerifyOtpPayload = {
  email: string;
  inviteCode: string;
  otp: string;
  username: string;
  pin: string;
  address: string;
  firstName: string;
  lastName: string;
  currency: string;
  interest?: string[];
};

export type VerifyOtpResponse = {
  message: string;
};

export const useAttendeeVerifyOtp = ({
  onSuccess,
  onError
}: ApiCallbacks<VerifyOtpResponse>) => {
  const mutation = useCustomMutation<VerifyOtpResponse>();

  return {
    verifyOtpMutation: (payload: VerifyOtpPayload) =>
      mutation.mutate(
        {
          url: '/attendee/verify-otp',
          method: 'POST',
          data: payload
        },
        {
          onSuccess: (data) => {
            onSuccess(data);
          },
          onError: (error) => {
            onError(error);
          }
        }
      ),
    isPending: mutation.isPending
  };
};
