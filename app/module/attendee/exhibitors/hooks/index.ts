import { useCustomQuery } from '@/app/core/shared/hooks';
import { attendeeExhibitorsService } from '../services';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { IPaginatedResponse } from '@/app/core/shared/types';

export interface IAttendeeExhibitor {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  logoUrl: string | null;
  lastLogin: string;
  boothNumber: string;
  boothName: string | null;
  standNumber: string | null;
  publicDescription: string;
  websiteUrl: string;
  createdAt: string;
  updatedAt: string;
  fcmToken: string | null;
  deactivated: boolean;
  country: string;
  currency: string;
  organizeId: string;
  invitedId: string;
  isFavorite: boolean;
}

export const useAttendeeExhibitors = (filter: Record<string, string>) => {
  const {
    data: exhibitors,
    isLoading: isLoadingExhibitor,
    isRefetching: isRefetchingExhibitor,
    refetch
  } = useCustomQuery<IPaginatedResponse<IAttendeeExhibitor>>({
    ...attendeeExhibitorsService.getExhibitors(filter),
    options: {
      staleTime: Infinity
    }
  });
  return {
    exhibitors: exhibitors?.data ?? EMPTY_ARRAY,
    isLoadingExhibitor,
    isRefetchingExhibitor,
    paginationMeta: extractPaginationMeta(exhibitors),
    refetchExhibitor: refetch
  };
};
