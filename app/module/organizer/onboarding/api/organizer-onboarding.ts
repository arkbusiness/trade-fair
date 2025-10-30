import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type OrganizerOnboardingPayload = {
  eventName: string;
  venueName: string;
  eventStartDate: string;
  eventEndDate: string;
};

export type OrganizerOnboardingResponse = {
  message: string;
};

export const useOrganizerOnboarding = ({
  onSuccess,
  onError
}: ApiCallbacks<OrganizerOnboardingResponse>) => {
  const mutation = useCustomMutation<OrganizerOnboardingResponse>();

  return {
    onboardingMutation: (payload: OrganizerOnboardingPayload) =>
      mutation.mutate(
        {
          url: '/organizer/onboarding',
          method: 'PATCH',
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
