import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { inventoryService } from '../services';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';

export enum InventoryStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  SHIPPED = 'SHIPPED',
  INVOICE = 'INVOICE'
}

export interface Inventory {
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
  exhibitor: {
    companyName: string;
    contactEmail: string;
  };
  customAttrs:
    | {
        key: string;
        value: string;
      }[]
    | null;
  createdAt: string;
  updatedAt: string;
  productCategoryId: string;
  isFavorite: boolean;
  productCategory: {
    id: string;
    name: string;
  } | null;
}

export const useInventory = (filter: Record<string, string> = {}) => {
  const {
    data: inventory,
    isLoading: isLoadingInventory,
    isRefetching: isRefetchingInventory,
    refetch
  } = useCustomQuery<IPaginatedResponse<Inventory>>({
    ...inventoryService.getProducts(filter)
  });
  return {
    inventory: inventory?.items ?? EMPTY_ARRAY,
    isLoadingInventory,
    isRefetchingInventory,
    paginationMeta: extractPaginationMeta(inventory),
    refetchInventory: refetch
  };
};
