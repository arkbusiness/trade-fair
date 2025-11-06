import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { exhibitorsQueryKeys } from './exhibitors-query-options';

export type DeactivateExhibitorPayload = {
  id: string;
};

export type DeactivateExhibitorResponse = {
  message: string;
};

export const useDeactivateExhibitor = ({
  onSuccess,
  onError
}: ApiCallbacks<DeactivateExhibitorResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeactivateExhibitorResponse>();

  return {
    deactivateExhibitor: (payload: DeactivateExhibitorPayload) =>
      mutation.mutate(
        {
          url: `/organizer/invites-exhibitors/${payload.id}/deactivate`,
          method: 'PATCH'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [exhibitorsQueryKeys.base]
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
