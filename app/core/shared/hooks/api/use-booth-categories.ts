import { EMPTY_ARRAY } from '../../constants';
import { boothCategoriesService } from '../../services';
import { IPaginatedResponse } from '../../types';
import { extractPaginationMeta } from '../../utils';
import { useCustomQuery } from '../use-custom-query';

export interface IBoothCategory {
  id: string;
  name: string;
  organizerId: string;
}

export const useBoothCategories = (filter: Record<string, string> = {}) => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isRefetching: isRefetchingCategories,
    refetch
  } = useCustomQuery<IPaginatedResponse<IBoothCategory>>({
    ...boothCategoriesService.getAll(filter),
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
    ...boothCategoriesService.getById(id),
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
