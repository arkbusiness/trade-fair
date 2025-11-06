import { useCustomQuery } from '@/app/core/shared/hooks';
import { getExhibitorOverviewQueryOptions } from './overview-query-options';
import type { IExhibitorMetrics } from './types';

export const useExhibitorOverview = (filter: Record<string, string> = {}) => {
  const {
    data: overviewStats,
    isLoading: isLoadingOverviewStats,
    isRefetching: isRefetchingOverviewStats,
    refetch
  } = useCustomQuery<IExhibitorMetrics>({
    ...getExhibitorOverviewQueryOptions(filter),
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
