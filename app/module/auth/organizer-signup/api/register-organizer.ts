import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type OrganizerSignupPayload = {
  token: string;
  contactPhone: string;
  companyName: string;
  country: string;
  password: string;
  contactName: string;
  adminUsername: string;
};

export type OrganizerSignupResponse = {
  message: string;
  accessToken: string;
};

export const useOrganizerSignup = ({
  onSuccess,
  onError
}: ApiCallbacks<OrganizerSignupResponse>) => {
  const mutation = useCustomMutation<OrganizerSignupResponse>();

  return {
    signupMutation: (payload: OrganizerSignupPayload) =>
      mutation.mutate(
        {
          url: `/organizer/register/${payload.token}`,
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
