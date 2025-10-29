import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type BookAppointmentParams = {
  meetingId: string;
};

export type JoinWaitingListParams = {
  exhibitorId: string;
};

export const useAttendeeBookAppointment = ({
  meetingId,
  onSuccess,
  onError
}: BookAppointmentParams & ApiCallbacks<void>) => {
  const mutation = useCustomMutation();

  return {
    bookAppointmentMutation: () =>
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

export const useAttendeeJoinWaitingList = ({
  exhibitorId,
  onSuccess,
  onError
}: JoinWaitingListParams & ApiCallbacks<void>) => {
  const mutation = useCustomMutation();

  return {
    joinWaitingListMutation: () =>
      mutation.mutate(
        {
          url: `/attendee/appointments/${exhibitorId}/waitlist`,
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
