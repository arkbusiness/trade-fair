import { buildQueryParams } from '@/app/core/shared/utils';

// Orders list query keys
export const attendeeOrdersQueryKeys = {
  base: 'attendee-orders',
  lists: (filter: Record<string, string>) => [
    attendeeOrdersQueryKeys.base,
    filter
  ]
};

export const getAttendeeOrdersQueryOptions = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter
  });

  return {
    queryKey: attendeeOrdersQueryKeys.lists(filter),
    url: `/attendee/orders${queryParams ? `?${queryParams}` : ''}`
  };
};

// Order by ID query keys
export const attendeeOrderByIdQueryKeys = {
  base: 'attendee-order',
  detail: (orderId: string) => [attendeeOrderByIdQueryKeys.base, orderId]
};

export const getAttendeeOrderByIdQueryOptions = (orderId: string) => ({
  queryKey: attendeeOrderByIdQueryKeys.detail(orderId),
  url: `/attendee/order/${orderId}`
});
