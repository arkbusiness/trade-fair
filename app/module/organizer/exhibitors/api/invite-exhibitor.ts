import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { exhibitorsQueryKeys } from './exhibitors-query-options';

export type InviteExhibitorPayload = {
  boothNumber: string;
  email: string;
};

export type InviteExhibitorResponse = {
  message: string;
};

export const useInviteExhibitor = ({
  onSuccess,
  onError
}: ApiCallbacks<InviteExhibitorResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<InviteExhibitorResponse>();

  return {
    inviteExhibitor: (payload: InviteExhibitorPayload) =>
      mutation.mutate(
        {
          url: '/organizer/invites-exhibitors',
          method: 'POST',
          data: payload
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
