import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { appointmentSlotsQueryKeys } from './get-appointment-slots';

export type UpdateAppointmentSlotPayload = {
  slotId: string;
  startTime: string;
  endTime: string;
};

export type UpdateAppointmentSlotResponse = {
  message: string;
  data: {
    id: string;
    startTime: string;
    endTime: string;
  };
};

export const useUpdateAppointmentSlot = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateAppointmentSlotResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateAppointmentSlotResponse>();

  return {
    updateAppointmentSlot: (payload: UpdateAppointmentSlotPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/appointments/slots/${payload.slotId}`,
          method: 'PATCH',
          data: {
            startTime: payload.startTime,
            endTime: payload.endTime
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [appointmentSlotsQueryKeys.base]
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
