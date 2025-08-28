import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { orderService } from '../services';

export enum InventoryStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  SHIPPED = 'SHIPPED',
  INVOICE = 'INVOICE'
}

export interface IOrder {
  id: string;
  exhibitorId: string;
  organizerId: string;
  name: string;
  basePrice: number;
  currency: string;
  sku: string;
  quantity: number;
  description: string;
  images: string[];
  tags: string[] | null;
  availableFrom: string;
  availableTo: string;
  customAttrs:
    | {
        key: string;
        value: string;
      }[]
    | null;
  createdAt: string;
  updatedAt: string;
  productCategoryId: string;
  productCategory: {
    id: string;
    name: string;
  } | null;
}

export const useOrders = (filter: Record<string, string> = {}) => {
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch
  } = useCustomQuery<IPaginatedResponse<IOrder>>({
    ...orderService.getOrders(filter)
  });
  return {
    orders: orders?.items ?? EMPTY_ARRAY,
    isLoadingOrders,
    isRefetchingOrders,
    paginationMeta: extractPaginationMeta(orders),
    refetchOrders: refetch
  };
};
