import { EMPTY_ARRAY } from '../../constants';
import { categoriesService } from '../../services';
import { IPaginatedResponse } from '../../types';
import { extractPaginationMeta } from '../../utils';
import { useCustomQuery } from '../use-custom-query';

export interface ICategory {
  id: string;
  name: string;
  organizerId: string;
}

export const useCategories = (filter: Record<string, string> = {}) => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isRefetching: isRefetchingCategories,
    refetch
  } = useCustomQuery<IPaginatedResponse<ICategory>>({
    ...categoriesService.getAll(filter),
    options: {
      staleTime: Infinity
    }
  });
  return {
    categories: categories?.data ?? EMPTY_ARRAY,
    paginationMeta: extractPaginationMeta(categories),
    isLoadingCategories,
    isRefetchingCategories,
    refetchCategories: refetch
  };
};

export const useCategoryById = (id: string) => {
  const {
    data: category,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch
  } = useCustomQuery<ICategory>({
    ...categoriesService.getById(id),
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
