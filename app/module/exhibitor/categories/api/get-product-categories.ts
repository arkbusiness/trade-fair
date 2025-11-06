import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { FilterParams, IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';

export interface IProductCategory {
  id: string;
  name: string;
}

export const productCategoriesQueryKeys = {
  base: 'exhibitor-product-categories',
  lists: (filter: FilterParams) => [
    productCategoriesQueryKeys.base,
    { ...filter }
  ]
};

const getProductCategoriesQueryOptions = (filter: FilterParams = {}) => {
  const queryParams = buildQueryParams({
    params: filter,
    appendDefaultLimit: false
  });

  return {
    queryKey: productCategoriesQueryKeys.lists(filter),
    url: `/exhibitor/product-categories${queryParams ? `?${queryParams}` : ''}`
  };
};

export const useProductCategories = (filter: FilterParams = {}) => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isRefetching: isRefetchingCategories,
    refetch
  } = useCustomQuery<IPaginatedResponse<IProductCategory>>({
    ...getProductCategoriesQueryOptions(filter),
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
