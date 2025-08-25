import { useCustomQuery } from '@/app/core/shared/hooks';
import { exhibitorOverviewService } from '../services';

interface IExhibitorMetrics {
  counts: {
    products: number;
    appointments: number;
    invoices: number;
  };
  latestOrders: [];
  appointments: [];
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
