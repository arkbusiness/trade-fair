import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import {
  IOrderItem,
  IOrderTimeline
} from '@/app/module/exhibitor/orders/hooks';

const buildUrl = (filter: Record<string, string>) => {
  const queryParams = buildQueryParams({
    params: filter
  });
  return `attendee/orders${queryParams ? `?${queryParams}` : ''}`;
};

export interface IAttendeeOrder {
  id: string;
  attendeeId: string;
  exhibitorId: string;
  trackingId: string | null;
  payment_slip: string | null;
  payment_slip_uploaded_at: string | null;
  payment_method: string | null;
  invoice_url: string | null;
  status: string;
  updatedAt: string;
  currency: string;
  createdAt: string;
  exhibitor: {
    id: string;
    companyName: string;
  };
  items: IOrderItem['items'];
  OrderTimeLine: IOrderTimeline[];
}

export const useAttendeeOrders = (filter: Record<string, string> = {}) => {
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch
  } = useCustomQuery<IPaginatedResponse<IAttendeeOrder>>({
    queryKey: ['attendee-orders', filter],
    url: buildUrl(filter)
  });

  return {
    orders: orders?.data ?? EMPTY_ARRAY,
    isLoadingOrders,
    isRefetchingOrders,
    paginationMeta: extractPaginationMeta(orders),
    refetchOrders: refetch
  };
};

export const useAttendeeOrderById = (orderId: string) => {
  const {
    data,
    isLoading: isLoadingOrder,
    isRefetching: isRefetchingOrder,
    refetch
  } = useCustomQuery<IOrderItem>({
    queryKey: ['attendee-order', orderId],
    url: `attendee/order/${orderId}`,
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
