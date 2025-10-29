import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type ExhibitorSignupPayload = {
  token: string;
  username: string;
  contactPhone: string;
  companyName: string;
  contactName: string;
  country: string;
  currency: string;
  contactEmail: string;
  logo: File | null;
  password: string;
};

export type ExhibitorSignupResponse = {
  message: string;
  accessToken: string;
};

export const useExhibitorSignup = ({
  onSuccess,
  onError
}: ApiCallbacks<ExhibitorSignupResponse>) => {
  const mutation = useCustomMutation<ExhibitorSignupResponse>();

  return {
    signupMutation: (payload: ExhibitorSignupPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/register/${payload.token}`,
          method: 'POST',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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
