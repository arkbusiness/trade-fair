import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type OrganizerSignupPayload = {
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
    signupMutation: (payload: OrganizerSignupPayload, token: string) =>
      mutation.mutate(
        {
          url: `/organizer/register/${token}`,
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
