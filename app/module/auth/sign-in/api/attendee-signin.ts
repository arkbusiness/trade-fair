import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type AttendeeSigninPayload = {
  usernameOrEmail: string;
  pin: string;
};

export type AttendeeSigninResponse = {
  accessToken: string;
};

export const useAttendeeSignin = ({
  onSuccess,
  onError
}: ApiCallbacks<AttendeeSigninResponse>) => {
  const mutation = useCustomMutation<AttendeeSigninResponse>();

  return {
    signinMutation: (payload: AttendeeSigninPayload) =>
      mutation.mutate(
        {
          url: '/attendee/login',
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
