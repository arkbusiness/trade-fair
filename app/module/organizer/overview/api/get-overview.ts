import { useCustomQuery } from '@/app/core/shared/hooks';
import { getOverviewQueryOptions } from './overview-query-options';
import type { IOrganizerMetrics } from './types';

export const useOrganizerOverview = (filter: Record<string, string> = {}) => {
  const {
    data: overviewStats,
    isLoading: isLoadingOverviewStats,
    isRefetching: isRefetchingOverviewStats,
    refetch
  } = useCustomQuery<IOrganizerMetrics>({
    ...getOverviewQueryOptions(filter),
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
