import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { appointmentSlotsQueryKeys } from './get-appointment-slots';
import { appointmentStatsQueryKeys } from './get-appointment-stats';
import { exhibitorOverviewQueryKeys } from '../../overview/api/overview-query-options';

export type AppointmentSlotInput = {
  startTime: string;
  endTime: string;
};

export type CreateAppointmentSlotsPayload = {
  slots: AppointmentSlotInput[];
};

export type CreateAppointmentSlotsResponse = {
  message: string;
  data: {
    id: string;
    startTime: string;
    endTime: string;
  }[];
};

export const useCreateAppointmentSlots = ({
  onSuccess,
  onError
}: ApiCallbacks<CreateAppointmentSlotsResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<CreateAppointmentSlotsResponse>();

  return {
    createAppointmentSlots: (payload: CreateAppointmentSlotsPayload) =>
      mutation.mutate(
        {
          url: '/exhibitor/appointments/slots',
          method: 'POST',
          data: payload
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [appointmentSlotsQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: [appointmentStatsQueryKeys.base]
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
