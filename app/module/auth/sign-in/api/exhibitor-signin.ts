import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type ExhibitorSigninPayload = {
  email: string;
  password: string;
};

export type SigninResponse = {
  accessToken: string;
};

export const useExhibitorSignin = ({
  onSuccess,
  onError
}: ApiCallbacks<SigninResponse>) => {
  const mutation = useCustomMutation<SigninResponse>();

  return {
    signinMutation: (payload: ExhibitorSigninPayload) =>
      mutation.mutate(
        {
          url: '/exhibitor/login',
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
