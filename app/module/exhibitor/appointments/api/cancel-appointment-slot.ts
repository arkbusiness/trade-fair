import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { appointmentSlotsQueryKeys } from './get-appointment-slots';
import { appointmentStatsQueryKeys } from './get-appointment-stats';

export type CancelAppointmentSlotPayload = {
  slotId: string;
};

export type CancelAppointmentSlotResponse = {
  message: string;
};

export const useCancelAppointmentSlot = ({
  onSuccess,
  onError
}: ApiCallbacks<CancelAppointmentSlotResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<CancelAppointmentSlotResponse>();

  return {
    cancelAppointmentSlot: (payload: CancelAppointmentSlotPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/appointments/slots/${payload.slotId}/cancel`,
          method: 'PATCH'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [appointmentSlotsQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: [appointmentStatsQueryKeys.base]
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
