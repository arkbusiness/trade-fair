import { EMPTY_ARRAY } from '../../constants';
import { IPaginatedResponse } from '../../types';
import { buildQueryParams, extractPaginationMeta } from '../../utils';
import { useCustomQuery } from '../use-custom-query';

export interface IBoothCategory {
  id: string;
  name: string;
  organizerId: string;
}

const boothCategoriesQueryKeys = {
  base: ['booth-categories'] as const,
  all: (queryParams: string) =>
    [...boothCategoriesQueryKeys.base, queryParams] as const,
  byId: (id: string) =>
    [...boothCategoriesQueryKeys.base, 'details', id] as const
};

export const useBoothCategories = (filter: Record<string, string> = {}) => {
  const queryParams = buildQueryParams({
    params: filter
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isRefetching: isRefetchingCategories,
    refetch
  } = useCustomQuery<IPaginatedResponse<IBoothCategory>>({
    url: `/organizer/category${queryParams ? `?${queryParams}` : ''}`,
    queryKey: boothCategoriesQueryKeys.all(queryParams),
    options: {
      staleTime: Infinity
    }
  });

  const firstCategory = categories?.data?.[0] ?? null;

  return {
    categories: categories?.data ?? EMPTY_ARRAY,
    firstCategory,
    paginationMeta: extractPaginationMeta(categories),
    isLoadingCategories,
    isRefetchingCategories,
    refetchCategories: refetch
  };
};

export const useBoothCategoryById = (id: string) => {
  const {
    data: category,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch
  } = useCustomQuery<IBoothCategory>({
    url: `/organizer/category/${id}`,
    queryKey: boothCategoriesQueryKeys.byId(id),
    options: {
      staleTime: Infinity
    }
  });
  return {
    category,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory: refetch
  };
};
