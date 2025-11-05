import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { boothsQueryKeys } from './booths-query-options';

export type UpdateBoothPayload = {
  id: string;
  number?: string;
  categoryId?: string;
};

export type UpdateBoothResponse = {
  message: string;
};

export const useUpdateBooth = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateBoothResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateBoothResponse>();

  return {
    updateBooth: (payload: UpdateBoothPayload) =>
      mutation.mutate(
        {
          url: `/organizer/booths/${payload.id}`,
          method: 'PUT',
          data: {
            number: payload.number,
            categoryId: payload.categoryId
          }
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
