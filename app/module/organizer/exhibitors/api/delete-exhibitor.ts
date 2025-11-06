import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { exhibitorsQueryKeys } from './exhibitors-query-options';

export type DeleteExhibitorPayload = {
  id: string;
};

export type DeleteExhibitorResponse = {
  message: string;
};

export const useDeleteExhibitor = ({
  onSuccess,
  onError
}: ApiCallbacks<DeleteExhibitorResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeleteExhibitorResponse>();

  return {
    deleteExhibitor: (payload: DeleteExhibitorPayload) =>
      mutation.mutate(
        {
          url: `/organizer/invites-exhibitors/${payload.id}`,
          method: 'DELETE'
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
