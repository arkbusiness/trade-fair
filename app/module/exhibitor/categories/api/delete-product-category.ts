import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { productCategoriesQueryKeys } from './get-product-categories';

export type DeleteProductCategoryPayload = {
  categoryId: string;
};

export type DeleteProductCategoryResponse = {
  message: string;
};

export const useDeleteProductCategory = ({
  onSuccess,
  onError
}: ApiCallbacks<DeleteProductCategoryResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<DeleteProductCategoryResponse>();

  return {
    deleteProductCategory: (payload: DeleteProductCategoryPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/product-categories/${payload.categoryId}`,
          method: 'DELETE'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [productCategoriesQueryKeys.base]
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
