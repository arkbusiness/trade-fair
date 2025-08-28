import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const inventoryService = {
  getProducts: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });
    return {
      url: `/exhibitor/products${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-products', queryParams]
    };
  },
  getById: (id: string) => {
    return {
      url: `/exhibitor/products/${id}`,
      queryKey: ['exhibitor-product', id]
    };
  },
  createInventory: (data: FormData): AxiosRequestConfig => ({
    url: `/exhibitor/products/manual-upload`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  updateInventory: (productId: string, data: FormData): AxiosRequestConfig => ({
    url: `/exhibitor/products/${productId}`,
    method: 'PATCH',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
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
