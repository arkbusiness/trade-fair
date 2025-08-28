import { buildQueryParams } from '@/app/core/shared/utils';

export const orderService = {
  getOrders: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });
    return {
      url: `/exhibitor/orders${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-orders', queryParams]
    };
  },
  getById: (id: string) => {
    return {
      url: `/exhibitor/orders/${id}`,
      queryKey: ['exhibitor-order', id]
    };
  }
};
