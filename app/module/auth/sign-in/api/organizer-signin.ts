import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type OrganizerSigninPayload = {
  email: string;
  password: string;
};

export type SigninResponse = {
  accessToken: string;
};

export const useOrganizerSignin = ({
  onSuccess,
  onError
}: ApiCallbacks<SigninResponse>) => {
  const mutation = useCustomMutation<SigninResponse>();

  return {
    signinMutation: (payload: OrganizerSigninPayload) =>
      mutation.mutate(
        {
          url: '/organizer/login',
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
