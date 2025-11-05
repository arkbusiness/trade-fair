import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { boothsQueryKeys } from './booths-query-options';

export type AssignExhibitorPayload = {
  id: string;
  exhibitorId: string;
};

export type AssignExhibitorResponse = {
  message: string;
};

export const useAssignExhibitor = ({
  onSuccess,
  onError
}: ApiCallbacks<AssignExhibitorResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<AssignExhibitorResponse>();

  return {
    assignExhibitor: (payload: AssignExhibitorPayload) =>
      mutation.mutate(
        {
          url: `/organizer/booths/${payload.id}/assign`,
          method: 'PUT',
          data: { exhibitorId: payload.exhibitorId }
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
