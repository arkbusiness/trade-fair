import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { orderService } from '../services';

export enum OrderStatus {
  PENDING = 'PENDING', //1
  CONFIRMED = 'CONFIRMED', //2
  CANCELLED = 'CANCELLED', // 2 - Only cancelled orders
  COMPLETED = 'COMPLETED', //6
  SHIPPED = 'SHIPPED', // 3
  INVOICE = 'INVOICE' // Invoice Requested
}

export enum OrderTimelineEnum {
  CREATED = 'CREATED',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export interface IOrderTimeline {
  id: string;
  orderId: string;
  status: OrderTimelineEnum;
  createdAt: string;
}

export interface IProduct {
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
  tags: string[];
  availableFrom: string;
  availableTo: string;
  customAttrs: string;
  createdAt: string;
  updatedAt: string;
  productCategoryId: string | null;
}

export interface IOrderItem {
  id: string;
  attendeeId: string;
  exhibitorId: string;
  trackingId: string | null;
  payment_slip: string | null;
  payment_slip_uploaded_at: string | null;
  payment_method: string | null;
  invoice_url: string | null;
  status: OrderStatus;
  updatedAt: string;
  currency: string;
  createdAt: string;
  OrderTimeLine: IOrderTimeline[];
  attendee: {
    id: string;
    username: string;
    email: string;
    lastLogin: string;
    contactName: string;
    phone: string | null;
    logoUrl: string | null;
    createdAt: string;
    updatedAt: string;
    pin: string;
    interests: string[];
    currency: string;
    exhibitorInviteId: string | null;
    organizerId: string;
  };
  items: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    product: IProduct;
  }[];
}

export interface IOrder {
  totalSales: Record<string, number>;
  totalTransactions: number;
  totalCustomers: number;
  orders: {
    data: IOrderItem[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface IPaginatedMeta {
  total: number;
  page: number;
  limit: number | string;
  pages: number;
}

export interface IPaginatedResponse<T> extends IPaginatedMeta {
  data: T[];
}

export const useOrders = (filter: Record<string, string> = {}) => {
  const {
    data,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch
  } = useCustomQuery<IOrder>({
    ...orderService.getOrders(filter)
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
