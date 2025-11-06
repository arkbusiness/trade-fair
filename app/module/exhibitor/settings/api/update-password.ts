import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type UpdatePasswordResponse = {
  message: string;
};

export const useUpdatePassword = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdatePasswordResponse>) => {
  const mutation = useCustomMutation<UpdatePasswordResponse>();

  return {
    updatePassword: (payload: UpdatePasswordPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/change-password`,
          method: 'PATCH',
          data: payload
        },
        {
          onSuccess: (data) => {
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
