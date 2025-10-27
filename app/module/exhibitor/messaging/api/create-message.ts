export * from './create-message';

import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { useMessageSlice } from '@/app/core/shared/slice';
import { ApiCallMethods } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { exhibitorChatMessagesKey } from './get-exhibitor-chat-messages';

export const useExhibitorCreateMessage = ({
  onSuccess,
  onError
}: ApiCallMethods<void>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation();
  const { selectedUserId } = useMessageSlice();

  return {
    createMessageMutation: (payload: { content: string }) => {
      mutation.mutate(
        {
          url: `/exhibitor/messages?attendeeId=${selectedUserId}`,
          method: 'POST',
          data: payload
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [exhibitorChatMessagesKey.base]
            });
            onSuccess();
          },
          onError: (error) => {
            onError(error);
          }
        }
      );
    },
    isLoading: mutation.isPending
  };
};
