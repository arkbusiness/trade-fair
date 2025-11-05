import { exhibitorUserQueryKeys } from '@/app/core/shared/hooks/api/use-exhibitor-user';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';

export type UpdateProfilePayload = {
  contactName?: string;
  contactPhone?: string;
};

export type UpdateProfileResponse = {
  message: string;
};

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
          url: `/exhibitor/profile`,
          method: 'PATCH',
          data: payload
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: exhibitorUserQueryKeys.profile
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
