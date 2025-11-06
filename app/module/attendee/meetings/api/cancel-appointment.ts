import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeeAppointmentsQueryKeys } from './get-attendee-appointments';

export type CancelAppointmentResponse = {
  message: string;
};

export const useCancelAppointment = ({
  onSuccess,
  onError
}: ApiCallbacks<CancelAppointmentResponse>) => {
  const mutation = useCustomMutation<CancelAppointmentResponse>();
  const queryClient = useQueryClient();

  return {
    cancelAppointment: (appointmentId: string) =>
      mutation.mutate(
        {
          url: `/attendee/appointments/${appointmentId}/cancel`,
          method: 'DELETE'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [attendeeAppointmentsQueryKeys.base]
            });
            onSuccess?.(data);
          },
          onError
        }
      ),
    isPending: mutation.isPending
  };
};
