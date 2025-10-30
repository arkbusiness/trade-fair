import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeeAppointmentSlotsQueryKeys } from './get-appointment-slots';

export type JoinWaitlistPayload = {
  exhibitorId: string;
};

export type JoinWaitlistResponse = {
  message: string;
};

export const useAttendeeJoinWaitingList = ({
  onSuccess,
  onError
}: ApiCallbacks<JoinWaitlistResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<JoinWaitlistResponse>();

  return {
    joinWaitingListMutation: (payload: JoinWaitlistPayload) =>
      mutation.mutate(
        {
          url: `/attendee/appointments/${payload.exhibitorId}/waitlist`,
          method: 'POST'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [attendeeAppointmentSlotsQueryKeys.base]
            });
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
