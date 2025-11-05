import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import type { UpdateProfilePayload, UpdateProfileResponse } from './types';
import { organizerUserQueryKeys } from '@/app/core/shared/hooks/api';

export const useUpdateProfile = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateProfileResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateProfileResponse>();

  return {
    updateProfile: (payload: UpdateProfilePayload) =>
      mutation.mutate(
        {
          url: '/organizer/profile',
          method: 'PATCH',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: organizerUserQueryKeys.profile
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
