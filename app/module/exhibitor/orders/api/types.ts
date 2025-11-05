import { IAttendee } from '@/app/module/organizer/attendees/hooks';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  SHIPPED = 'SHIPPED',
  INVOICE = 'INVOICE'
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

export interface IOrderTracking {
  orderId: string;
  courier: string;
  name: string | null;
  status: string | null;
  code: string | null;
  phone: string | null;
  note: string | null;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: IProduct;
}

export interface IOrderItems {
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
  tracking: IOrderTracking[] | null;
  OrderTimeLine: IOrderTimeline[];
  attendee: IAttendee;
  items: IOrderItem[];
}

export interface IOrder {
  totalSales: Record<string, number>;
  totalTransactions: number;
  totalCustomers: number;
  orders: {
    data: IOrderItems[];
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IPaginatedMeta {
  total: number;
  page: number;
  limit: number | string;
  pages: number;
}

export interface IPaginatedResponse<T> extends IPaginatedMeta {
  data: T[];
}
