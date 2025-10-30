import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeeAppointmentSlotsQueryKeys } from './get-appointment-slots';

export type BookAppointmentPayload = {
  meetingId: string;
};

export type BookAppointmentResponse = {
  message: string;
};

export const useAttendeeBookAppointment = ({
  onSuccess,
  onError
}: ApiCallbacks<BookAppointmentResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<BookAppointmentResponse>();

  return {
    bookAppointmentMutation: (payload: BookAppointmentPayload) =>
      mutation.mutate(
        {
          url: `/attendee/appointments/${payload.meetingId}/book`,
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
