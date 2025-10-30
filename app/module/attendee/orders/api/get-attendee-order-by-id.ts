import { useCustomQuery } from '@/app/core/shared/hooks';
import { IOrderTracking } from '@/app/module/exhibitor/orders/hooks';
import { IAttendeeOrder } from './get-attendee-orders';
import { getAttendeeOrderByIdQueryOptions } from './order-query-options';

export const useAttendeeOrderById = (orderId: string) => {
  const {
    data,
    isLoading: isLoadingOrder,
    isRefetching: isRefetchingOrder,
    refetch
  } = useCustomQuery<{
    order: IAttendeeOrder;
    trackingDetails: IOrderTracking[] | null;
  }>({
    ...getAttendeeOrderByIdQueryOptions(orderId),
    options: {
      enabled: !!orderId
    }
  });

  return {
    order: data?.order,
    trackingDetails: data?.trackingDetails,
    isLoadingOrder,
    isRefetchingOrder,
    refetchOrder: refetch
  };
};
