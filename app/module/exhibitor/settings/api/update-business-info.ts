import { exhibitorUserQueryKeys } from '@/app/core/shared/hooks/api/use-exhibitor-user';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';

export type UpdateBusinessInfoResponse = {
  message: string;
};

export const useUpdateBusinessInfo = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateBusinessInfoResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateBusinessInfoResponse>();

  return {
    updateBusinessInfo: (payload: FormData) =>
      mutation.mutate(
        {
          url: `/exhibitor/business-info`,
          method: 'PATCH',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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
