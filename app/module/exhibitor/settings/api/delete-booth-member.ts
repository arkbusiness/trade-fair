import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { settingsQueryKeys } from './settings-query-options';

export type DeleteBoothMemberPayload = {
  id: string;
};

export type DeleteBoothMemberResponse = {
  message: string;
};

export const useDeleteBoothMember = ({
  onSuccess,
  onError
}: ApiCallbacks<DeleteBoothMemberResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeleteBoothMemberResponse>();

  return {
    deleteBoothMember: (payload: DeleteBoothMemberPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/users/${payload.id}`,
          method: 'DELETE'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [settingsQueryKeys.boothMembers.base]
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
