import { useCustomQuery } from '@/app/core/shared/hooks';
import { organizerOverviewService } from '../services';

interface IOrganizerMetrics {
  engagement: {
    loggedInAttendees: number;
    invitedAttendees: number;
    loggedInExhibitors: number;
    invitedExhibitors: number;
    exhibitorCompletionRate: number;
  };
  counts: {
    registeredExhibitors: number;
    invitedExhibitors: number;
    registeredAttendees: number;
    invitedAttendees: number;
    totalProducts: number;
    productsUploadedInRange: number;
  };
}

export const useOrganizerOverview = () => {
  const {
    data: overviewStats,
    isLoading: isLoadingOverviewStats,
    isRefetching: isRefetchingOverviewStats,
    refetch
  } = useCustomQuery<IOrganizerMetrics>({
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
