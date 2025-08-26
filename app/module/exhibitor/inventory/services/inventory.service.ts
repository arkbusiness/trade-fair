import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const inventoryService = {
  getProducts: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter,
      appendDefaultLimit: false
    });
    return {
      url: `/exhibitor/products${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-products', queryParams]
    };
  },
  deleteInventory: (id: string): AxiosRequestConfig => ({
    url: `/exhibitor/products/${id}`,
    method: 'DELETE'
  }),
  csvImport: (data: { file: File }): AxiosRequestConfig => ({
    url: `/exhibitor/products-csv-import`,
    method: 'POST',
    data: {
      file: data.file
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  exportProducts: (data?: string[]): AxiosRequestConfig => ({
    url: `/exhibitor/products/export`,
    method: 'POST',
    data
  })
};
