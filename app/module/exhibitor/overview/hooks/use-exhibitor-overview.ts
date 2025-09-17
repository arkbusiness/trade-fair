import { useCustomQuery } from '@/app/core/shared/hooks';
import { exhibitorOverviewService } from '../services';
import { InventoryStatus } from '../../inventory/hooks';

export interface IExhibitorLatestOrder {
  id: string;
  attendeeId: string;
  exhibitorId: string;
  trackingId: string;
  payment_slip: string | null;
  attendee: {
    contactName: string;
  };
  items: {
    product: {
      name: string;
    };
  }[];
  payment_slip_uploaded_at: string | null;
  payment_method: string | null;
  invoice_url: string | null;
  status: InventoryStatus;
  updatedAt: string | null;
  currency: string;
  createdAt: string;
}

export interface IExhibitorAppointment {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  waitlistPosition: string | null;
  attendee: { id: string; email: string };
}

export interface IExhibitorMetrics {
  counts: {
    products: number;
    appointments: number;
    invoices: number;
  };
  latestOrders: IExhibitorLatestOrder[];
  appointments: IExhibitorAppointment[];
  chartData: {
    Sun: number;
    Mon: number;
    Tue: number;
    Wed: number;
    Thu: number;
    Fri: number;
    Sat: number;
  };
  orderComparison: {
    today: number;
    yesterday: number;
    difference: number;
    message: string;
  };
}

export const useExhibitorOverview = (filter: Record<string, string> = {}) => {
  const {
    data: overviewStats,
    isLoading: isLoadingOverviewStats,
    isRefetching: isRefetchingOverviewStats,
    refetch
  } = useCustomQuery<IExhibitorMetrics>({
    ...exhibitorOverviewService.getMetrics(filter),
    options: {
      staleTime: Infinity
    }
  });
  return {
    overviewStats,
    isLoadingOverviewStats,
    isRefetchingOverviewStats,
    refetchOverviewStats: refetch
  };
};
