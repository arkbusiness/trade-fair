import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { settingsQueryKeys } from './settings-query-options';

export type AddBoothMemberPayload = {
  email: string;
  password: string;
};

export type AddBoothMemberResponse = {
  message: string;
};

export const useAddBoothMember = ({
  onSuccess,
  onError
}: ApiCallbacks<AddBoothMemberResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<AddBoothMemberResponse>();

  return {
    addBoothMember: (payload: AddBoothMemberPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/users`,
          method: 'POST',
          data: payload
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
