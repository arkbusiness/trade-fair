import { useCustomQuery } from '@/app/core/shared/hooks';
import { getProductByIdQueryOptions } from './product-query-options';
import type { Inventory } from './types';

export const useProductById = (id: string) => {
  const {
    data: product,
    isLoading: isLoadingProduct,
    isRefetching: isRefetchingProduct,
    refetch
  } = useCustomQuery<Inventory>({
    ...getProductByIdQueryOptions(id)
  });

  return {
    product,
    isLoadingProduct,
    isRefetchingProduct,
    refetchProduct: refetch
  };
};
