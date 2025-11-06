import { useCustomQuery } from '@/app/core/shared/hooks';
import { getOrderByIdQueryOptions } from './order-query-options';
import type { IOrderItems } from './types';

export const useOrderById = (orderId: string) => {
  const {
    data,
    isLoading: isLoadingOrder,
    isRefetching: isRefetchingOrder,
    refetch
  } = useCustomQuery<IOrderItems>({
    ...getOrderByIdQueryOptions(orderId),
    options: {
      enabled: !!orderId
    }
  });

  return {
    order: data,
    isLoadingOrder,
    isRefetchingOrder,
    refetchOrder: refetch
  };
};
