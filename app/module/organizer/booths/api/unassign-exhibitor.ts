import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { boothsQueryKeys } from './booths-query-options';

export type UnassignExhibitorPayload = {
  id: string;
};

export type UnassignExhibitorResponse = {
  message: string;
};

export const useUnassignExhibitor = ({
  onSuccess,
  onError
}: ApiCallbacks<UnassignExhibitorResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UnassignExhibitorResponse>();

  return {
    unassignExhibitor: (payload: UnassignExhibitorPayload) =>
      mutation.mutate(
        {
          url: `/organizer/booths/${payload.id}/unassign`,
          method: 'PUT'
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
