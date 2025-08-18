import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { exhibitorsService } from '../services';

export interface IExhibitor {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  logoUrl: string;
  lastLogin: string | null;
  boothNumber: string;
  boothName: string;
  standNumber: string;
  publicDescription: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  fcmToken: string;
  organizer: {
    id: string;
    name: string;
  };
  organizeId: string;
  users: {
    id: string;
    username: string;
    email: string;
    lastLogin?: string | null;
    isPrimary: boolean;
    exhibitorId: string;
    createdAt: string;
    updatedAt: string;
    organizerId?: string;
    fcmToken?: string | null;
  }[];
  invitedId: string;
  AppointmentSlot: {
    id: string;
    exhibitorId: string;
    attendeeId?: string;
    startTime: string;
    endTime: string;
    waitlistPosition?: number | null;
    createdAt: string;
  }[];
}

export const useExhibitors = (filter: Record<string, string> = {}) => {
  const {
    data: exhibitors,
    isLoading: isLoadingExhibitors,
    isRefetching: isRefetchingExhibitors,
    refetch
  } = useCustomQuery<IPaginatedResponse<IExhibitor>>({
    ...exhibitorsService.getExhibitors(filter)
  });
  return {
    exhibitors: exhibitors?.data ?? EMPTY_ARRAY,
    isLoadingExhibitors,
    isRefetchingExhibitors,
    paginationMeta: extractPaginationMeta(exhibitors),
    refetchExhibitors: refetch
  };
};
