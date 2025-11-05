import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import type { ChangePasswordPayload, ChangePasswordResponse } from './types';

export const useChangePassword = ({
  onSuccess,
  onError
}: ApiCallbacks<ChangePasswordResponse>) => {
  const mutation = useCustomMutation<ChangePasswordResponse>();

  return {
    changePassword: (payload: ChangePasswordPayload) =>
      mutation.mutate(
        {
          url: '/organizer/change-password',
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
