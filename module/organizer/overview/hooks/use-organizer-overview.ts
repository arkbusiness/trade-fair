import { useCustomQuery } from '@/app/core/shared/hooks';
import { organizerOverviewService } from '../services';

export const useOrganizerOverview = () => {
  const {
    data: overviewStats,
    isLoading: isLoadingOverviewStats,
    isRefetching: isRefetchingOverviewStats,
    refetch
    // TODO: Remove any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useCustomQuery<any>({
    ...organizerOverviewService.getMetrics(),
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
