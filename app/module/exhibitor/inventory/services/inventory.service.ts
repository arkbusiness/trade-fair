import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

interface IMutateInventory {
  name: string;
  description: string;
  sku: string;
  basePrice: number;
  images: File[];
  quantity: number;
  currency: string;
  tags: string[] | null;
  customAttrs: { key: string; value: string }[] | null;
  productCategoryId: string | null;
  availableFrom: string;
  availableTo: string;
}

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
  createInventory: (data: IMutateInventory): AxiosRequestConfig => ({
    url: `/exhibitor/products/manual-upload`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  updateInventory: (
    productId: string,
    data: IMutateInventory
  ): AxiosRequestConfig => ({
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
