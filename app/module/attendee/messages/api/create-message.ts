import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { useMessageSlice } from '@/app/core/shared/slice';
import { ApiCallMethods } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { chatMessagesKey } from './get-attendee-chat-messages';

export const useAttendeeCreateMessage = ({
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
          url: `/attendee/exhibitors/${selectedUserId}/messages`,
          method: 'POST',
          data: payload
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [chatMessagesKey.base]
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
