import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { getOrdersQueryOptions } from './order-query-options';
import type { IOrder } from './types';

export const useOrders = (filter: Record<string, string> = {}) => {
  const {
    data,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch
  } = useCustomQuery<IOrder>({
    ...getOrdersQueryOptions(filter)
  });

  return {
    orders: data?.orders?.data ?? EMPTY_ARRAY,
    orderStats: {
      totalSales: data?.totalSales ?? {},
      totalTransactions: data?.totalTransactions ?? 0,
      totalCustomers: data?.totalCustomers ?? 0
    },
    isLoadingOrders,
    isRefetchingOrders,
    paginationMeta: extractPaginationMeta(data?.orders),
    refetchOrders: refetch
  };
};
