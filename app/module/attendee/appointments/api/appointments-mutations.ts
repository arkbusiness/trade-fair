import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallMethods } from '@/app/core/shared/types';

export type BookAppointmentParams = {
  meetingId: string;
};

export type JoinWaitingListParams = {
  exhibitorId: string;
};

export const useBookAppointment = ({
  meetingId,
  onSuccess,
  onError
}: BookAppointmentParams & ApiCallMethods<void>) => {
  const mutation = useCustomMutation();

  return {
    addToFavouriteMutation: () =>
      mutation.mutate(
        {
          url: `/attendee/appointments/${meetingId}/book`,
          method: 'POST'
        },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: (error) => {
            onError(error);
          }
        }
      ),
    isPending: mutation.isPending
  };
};

export const useJoinWaitingList = ({
  exhibitorId,
  onSuccess,
  onError
}: JoinWaitingListParams & ApiCallMethods<void>) => {
  const mutation = useCustomMutation();

  return {
    removeFromFavouriteMutation: () =>
      mutation.mutate(
        {
          url: `/attendee/appointments/${exhibitorId}/waiting`,
          method: 'POST'
        },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: (error) => {
            onError(error);
          }
        }
      ),
    isPending: mutation.isPending
  };
};
