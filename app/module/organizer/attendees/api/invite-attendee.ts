import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeesQueryKeys } from './attendees-query-options';

export type InviteAttendeePayload = {
  email: string;
};

export type InviteAttendeeResponse = {
  message: string;
};

export const useInviteAttendee = ({
  onSuccess,
  onError
}: ApiCallbacks<InviteAttendeeResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<InviteAttendeeResponse>();

  return {
    inviteAttendee: (payload: InviteAttendeePayload) =>
      mutation.mutate(
        {
          url: '/organizer/attendee-invites',
          method: 'POST',
          data: payload
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [attendeesQueryKeys.base]
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
