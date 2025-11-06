import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { appointmentSlotsQueryKeys } from './get-appointment-slots';
import { exhibitorOverviewQueryKeys } from '../../overview/api/overview-query-options';

export type DeleteAppointmentSlotPayload = {
  slotId: string;
};

export type DeleteAppointmentSlotResponse = {
  message: string;
};

export const useDeleteAppointmentSlot = ({
  onSuccess,
  onError
}: ApiCallbacks<DeleteAppointmentSlotResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeleteAppointmentSlotResponse>();

  return {
    deleteAppointmentSlot: (payload: DeleteAppointmentSlotPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/appointments/slots/${payload.slotId}`,
          method: 'DELETE'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [appointmentSlotsQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: [exhibitorOverviewQueryKeys.base]
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
