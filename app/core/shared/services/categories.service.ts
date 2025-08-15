import { buildQueryParams } from '@/app/core/shared/utils';

export const categoriesService = {
  getAll: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });
    return {
      url: `/organizer/category${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['categories', queryParams]
    };
  },
  getById: (id: string) => {
    return {
      url: `/organizer/category/${id}`,
      queryKey: ['category', id]
    };
  }
};
