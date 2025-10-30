import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type RequestOtpPayload = {
  email: string;
  inviteCode: string;
};

export type RequestOtpResponse = {
  message: string;
};

export const useAttendeeRequestOtp = ({
  onSuccess,
  onError
}: ApiCallbacks<RequestOtpResponse>) => {
  const mutation = useCustomMutation<RequestOtpResponse>();

  return {
    requestOtpMutation: (payload: RequestOtpPayload) =>
      mutation.mutate(
        {
          url: '/attendee/request-otp',
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
