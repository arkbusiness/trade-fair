import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import {
  IOrderItem,
  IOrderTimeline
} from '@/app/module/exhibitor/orders/hooks';
import { getAttendeeOrdersQueryOptions } from './order-query-options';

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
    contactEmail: string;
    contactPhone: string;
    PaymentDetails:
      | [
          {
            id: string;
            exhibitorId: string;
            bankName: string;
            bankAccountName: string;
            bankAccountNumber: string;
          }
        ]
      | null;
  };
  attendee: {
    id: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
  };
  items: IOrderItem[];
  OrderTimeLine: IOrderTimeline[];
}

export const useAttendeeOrders = (filter: Record<string, string> = {}) => {
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch
  } = useCustomQuery<IPaginatedResponse<IAttendeeOrder>>({
    ...getAttendeeOrdersQueryOptions(filter)
  });

  return {
    orders: orders?.data ?? EMPTY_ARRAY,
    isLoadingOrders,
    isRefetchingOrders,
    paginationMeta: extractPaginationMeta(orders),
    refetchOrders: refetch
  };
};
