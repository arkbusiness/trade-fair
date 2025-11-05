import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { productQueryKeys } from './product-query-options';

export type DeleteProductPayload = {
  id: string;
};

export type DeleteProductResponse = {
  message: string;
};

export const useDeleteProduct = ({
  onSuccess,
  onError
}: ApiCallbacks<DeleteProductResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeleteProductResponse>();

  return {
    deleteProduct: (payload: DeleteProductPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/products/${payload.id}`,
          method: 'DELETE'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [productQueryKeys.base]
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
