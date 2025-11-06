import { buildQueryParams } from '@/app/core/shared/utils';

export const orderQueryKeys = {
  base: 'exhibitor-orders',
  lists: (filter: Record<string, string>) => [
    orderQueryKeys.base,
    { ...filter }
  ],
  detail: (id: string) => ['exhibitor-order', id]
};

export const getOrdersQueryOptions = (filter: Record<string, string> = {}) => {
  const queryParams = buildQueryParams({
    params: filter
  });
  return {
    queryKey: orderQueryKeys.lists(filter),
    url: `/exhibitor/orders/dashboard${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getOrderByIdQueryOptions = (id: string) => ({
  queryKey: orderQueryKeys.detail(id),
  url: `/exhibitor/orders/${id}`
});
