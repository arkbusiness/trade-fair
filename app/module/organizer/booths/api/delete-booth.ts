import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { boothsQueryKeys } from './booths-query-options';

export type DeleteBoothPayload = {
  id: string;
};

export type DeleteBoothResponse = {
  message: string;
};

export const useDeleteBooth = ({
  onSuccess,
  onError
}: ApiCallbacks<DeleteBoothResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeleteBoothResponse>();

  return {
    deleteBooth: (payload: DeleteBoothPayload) =>
      mutation.mutate(
        {
          url: `/organizer/booths/${payload.id}`,
          method: 'DELETE'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [boothsQueryKeys.base]
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
