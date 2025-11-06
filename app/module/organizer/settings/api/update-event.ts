import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import type { UpdateEventPayload, UpdateEventResponse } from './types';
import { organizerUserQueryKeys } from '@/app/core/shared/api';
import { overviewQueryKeys } from '../../overview/api/overview-query-options';

export const useUpdateEvent = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateEventResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateEventResponse>();

  return {
    updateEvent: (payload: UpdateEventPayload) =>
      mutation.mutate(
        {
          url: '/organizer/onboarding',
          method: 'PATCH',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: organizerUserQueryKeys.profile
            });
            queryClient.invalidateQueries({
              queryKey: [overviewQueryKeys.base]
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
