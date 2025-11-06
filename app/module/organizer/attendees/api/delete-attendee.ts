import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeesQueryKeys } from './attendees-query-options';

export type DeleteAttendeePayload = {
  id: string;
};

export type DeleteAttendeeResponse = {
  message: string;
};

export const useDeleteAttendee = ({
  onSuccess,
  onError
}: ApiCallbacks<DeleteAttendeeResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeleteAttendeeResponse>();

  return {
    deleteAttendee: (payload: DeleteAttendeePayload) =>
      mutation.mutate(
        {
          url: `/organizer/invites-attendees/${payload.id}`,
          method: 'DELETE'
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
