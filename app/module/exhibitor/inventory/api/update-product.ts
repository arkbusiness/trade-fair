import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { productQueryKeys } from './product-query-options';

export type UpdateProductPayload = {
  productId: string;
  data: FormData;
};

export type UpdateProductResponse = {
  message: string;
  data: {
    id: string;
    name: string;
  };
};

export const useUpdateProduct = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateProductResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateProductResponse>();

  return {
    updateProduct: ({ productId, data }: UpdateProductPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/products/${productId}`,
          method: 'PATCH',
          data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (responseData) => {
            queryClient.invalidateQueries({
              queryKey: [productQueryKeys.base]
            });
            onSuccess(responseData);
          },
          onError: (error) => {
            onError(error);
          }
        }
      ),
    isPending: mutation.isPending
  };
};
