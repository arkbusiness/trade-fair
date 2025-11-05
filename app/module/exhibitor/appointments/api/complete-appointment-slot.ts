import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { appointmentSlotsQueryKeys, SlotStatus } from './get-appointment-slots';
import { appointmentStatsQueryKeys } from './get-appointment-stats';

export type CompleteAppointmentSlotPayload = {
  slotId: string;
};

export type CompleteAppointmentSlotResponse = {
  message: string;
};

export const useCompleteAppointmentSlot = ({
  onSuccess,
  onError
}: ApiCallbacks<CompleteAppointmentSlotResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<CompleteAppointmentSlotResponse>();

  return {
    completeAppointmentSlot: (payload: CompleteAppointmentSlotPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/appointments/slots/${payload.slotId}`,
          method: 'PATCH',
          data: {
            status: SlotStatus.COMPLETED
          }
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
