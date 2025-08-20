import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { organizerExhibitorsService } from '../services';

export interface IOrganizerExhibitor {
  id: string;
  email: string;
  boothNumber: string;
  totalPossibleExhibitorMembers: number;
  boothMembers: number;
  used: boolean;
  status: string;
  token: string;
  logo: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  publicDescription: string | null;
  registrationTimeLine: {
    invited: string | null;
    registered: string | null;
  };
  boothMembersList: {
    id: string;
    createdAt: string;
    email: string;
    username: string;
    isPrimary: boolean;
  }[];
  exhibitorName: string | null;
  exhibitorEmail: string | null;
  exhibitorCompanyName: string | null;
  registeredAt: string | null;
  inviteLink: string;
}

export const useOrganizerExhibitors = (filter: Record<string, string> = {}) => {
  const {
    data: exhibitors,
    isLoading: isLoadingExhibitors,
    isRefetching: isRefetchingExhibitors,
    refetch
  } = useCustomQuery<IPaginatedResponse<IOrganizerExhibitor>>({
    ...organizerExhibitorsService.getExhibitors(filter)
  });
  return {
    exhibitors: exhibitors?.data ?? EMPTY_ARRAY,
    isLoadingExhibitors,
    isRefetchingExhibitors,
    paginationMeta: extractPaginationMeta(exhibitors),
    refetchExhibitors: refetch
  };
};

export const useOrganizerExhibitorById = (id: string) => {
  const {
    data: exhibitor,
    isLoading: isLoadingExhibitor,
    isRefetching: isRefetchingExhibitor,
    refetch
  } = useCustomQuery<IOrganizerExhibitor>({
    ...organizerExhibitorsService.getExhibitorById(id)
  });
  return {
    exhibitor,
    isLoadingExhibitor,
    isRefetchingExhibitor,
    refetchExhibitor: refetch
  };
};
