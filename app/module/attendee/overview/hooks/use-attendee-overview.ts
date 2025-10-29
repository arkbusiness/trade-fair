import { useCustomQuery } from '@/app/core/shared/hooks';
import { attendeeOverviewService } from '../services';

interface IAttendeeMetrics {
  organizer: {
    id: string;
    eventLogoUrl: string;
    eventName: string;
    eventEndDate: string;
    eventStartDate: string;
    venueName: string;
    eventTimeZone: string | null;
  };
  ordersCount: number;
  exhibitorCount: number;
  appointments: number;
  ordersInvoiceRequestedCount: number;
  exhibitors: {
    id: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    logoUrl: string;
    lastLogin: string;
    boothNumber: string;
    boothName: string | null;
    standNumber: string | null;
    publicDescription: string;
    websiteUrl: string;
    createdAt: string;
    updatedAt: string;
    password: string;
    fcmToken: string | null;
    deactivated: boolean;
    country: string;
    currency: string;
    organizeId: string;
    invitedId: string;
  }[];
  exhibitorFav: number;
}

export const useAttendeeOverview = () => {
  const {
    data: overviewStats,
    isLoading: isLoadingOverviewStats,
    isRefetching: isRefetchingOverviewStats,
    refetch
  } = useCustomQuery<IAttendeeMetrics>({
    ...attendeeOverviewService.getMetrics(),
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
