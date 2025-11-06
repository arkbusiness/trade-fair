import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { boothsQueryKeys } from './booths-query-options';

export type CreateBoothPayload = {
  number: string;
  categoryId: string;
};

export type CreateBoothResponse = {
  message: string;
  data: {
    id: string;
    number: string;
  };
};

export const useCreateBooth = ({
  onSuccess,
  onError
}: ApiCallbacks<CreateBoothResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<CreateBoothResponse>();

  return {
    createBooth: (payload: CreateBoothPayload) =>
      mutation.mutate(
        {
          url: '/organizer/booths',
          method: 'POST',
          data: payload
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
