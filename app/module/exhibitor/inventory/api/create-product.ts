import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { productQueryKeys } from './product-query-options';
import { exhibitorOverviewQueryKeys } from '../../overview/api/overview-query-options';

export type CreateProductPayload = FormData;

export type CreateProductResponse = {
  message: string;
  data: {
    id: string;
    name: string;
  };
};

export const useCreateProduct = ({
  onSuccess,
  onError
}: ApiCallbacks<CreateProductResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<CreateProductResponse>();

  return {
    createProduct: (payload: CreateProductPayload) =>
      mutation.mutate(
        {
          url: '/exhibitor/products/manual-upload',
          method: 'POST',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [productQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: [exhibitorOverviewQueryKeys.base]
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
