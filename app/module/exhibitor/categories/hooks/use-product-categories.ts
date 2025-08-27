import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { productCategoriesService } from '../services';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';

export interface IProductCategory {
  id: string;
  name: string;
}

export const useProductCategories = () => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isRefetching: isRefetchingCategories,
    refetch
  } = useCustomQuery<IPaginatedResponse<IProductCategory>>({
    ...productCategoriesService.getCategories(),
    options: {
      staleTime: Infinity
    }
  });
  return {
    categories: categories?.items ?? EMPTY_ARRAY,
    isLoadingCategories,
    isRefetchingCategories,
    paginationMeta: extractPaginationMeta(categories),
    refetchCategories: refetch
  };
};
