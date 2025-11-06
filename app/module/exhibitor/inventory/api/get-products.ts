import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { getProductsQueryOptions } from './product-query-options';
import type { Inventory } from './types';

export const useInventory = (filter: Record<string, string> = {}) => {
  const {
    data: inventory,
    isLoading: isLoadingInventory,
    isRefetching: isRefetchingInventory,
    refetch
  } = useCustomQuery<IPaginatedResponse<Inventory>>({
    ...getProductsQueryOptions(filter)
  });

  return {
    inventory: inventory?.items ?? EMPTY_ARRAY,
    isLoadingInventory,
    isRefetchingInventory,
    paginationMeta: extractPaginationMeta(inventory),
    refetchInventory: refetch
  };
};
