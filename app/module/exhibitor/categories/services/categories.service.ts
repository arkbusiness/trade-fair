import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const productCategoriesService = {
  getCategories: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter,
      appendDefaultLimit: false
    });
    return {
      url: `/exhibitor/product-categories${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-product-categories', queryParams]
    };
  },
  deleteCategory: (id: string): AxiosRequestConfig => ({
    url: `/exhibitor/product-categories/${id}`,
    method: 'DELETE'
  }),
  updateCategory: (
    id: string,
    data: Record<string, string>
  ): AxiosRequestConfig => ({
    url: `/exhibitor/product-categories/${id}`,
    method: 'PUT',
    data
  })
};
