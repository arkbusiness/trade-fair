import { useCustomQuery } from '@/app/core/shared/hooks';
import { boothsService } from '../services';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';

export interface IBooth {
  id: string;
  number: string;
  assigned: boolean;
  assignedAt?: string;
  categoryName: string;
  categoryId: string;
  organizerId: string;
  organizer: {
    id: string;
    companyName: string;
    companyEmail: string;
    contactName: string;
    contactPhone?: string;
  };
  exhibitor?: {
    companyName: string;
    companyEmail: string;
    contactName: string;
    contactPhone: string;
    logoUrl?: string;
  } | null;
  exhibitorId?: string;
}

export const useBooths = (filter: Record<string, string> = {}) => {
  const {
    data: booths,
    isLoading: isLoadingBooths,
    isRefetching: isRefetchingBooths,
    refetch
  } = useCustomQuery<IPaginatedResponse<IBooth>>({
    ...boothsService.getBooths(filter)
  });
  return {
    booths: booths?.data ?? EMPTY_ARRAY,
    isLoadingBooths,
    isRefetchingBooths,
    paginationMeta: extractPaginationMeta(booths),
    refetchBooths: refetch
  };
};
