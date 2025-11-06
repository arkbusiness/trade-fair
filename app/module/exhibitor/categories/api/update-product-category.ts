import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { productCategoriesQueryKeys } from './get-product-categories';

export type UpdateProductCategoryPayload = {
  categoryId: string;
  name: string;
};

export type UpdateProductCategoryResponse = {
  message: string;
  data: {
    id: string;
    name: string;
  };
};

export const useUpdateProductCategory = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateProductCategoryResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateProductCategoryResponse>();

  return {
    updateProductCategory: (payload: UpdateProductCategoryPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/product-categories/${payload.categoryId}`,
          method: 'PUT',
          data: {
            name: payload.name
          }
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
