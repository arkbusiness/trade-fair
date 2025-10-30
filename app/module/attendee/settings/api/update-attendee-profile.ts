import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type UpdateAttendeeProfilePayload = FormData;

export type UpdateAttendeeProfileResponse = {
  message: string;
};

export const useUpdateAttendeeProfile = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateAttendeeProfileResponse>) => {
  const mutation = useCustomMutation<UpdateAttendeeProfileResponse>();

  return {
    updateProfile: (data: UpdateAttendeeProfilePayload) =>
      mutation.mutate(
        {
          url: '/attendee/profile',
          method: 'PATCH',
          data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess,
          onError
        }
      ),
    isPending: mutation.isPending
  };
};
