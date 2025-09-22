import { useCustomQuery } from '@/app/core/shared/hooks';
import { boothsService } from '../services';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';

export interface IBooth {
  id: string;
  number: string;
  status: string;
  assigned: boolean;
  assignedAt?: string;
  categoryName: string;
  categoryId: string;
  organizerId: string;
  logoUrl?: string | null;
  exhibitorName?: string | null;
  exhibitorEmail?: string | null;
  exhibitorId?: string | null;
  productsCount: number;
  createdAt?: string;
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

export const useBoothById = (id: string) => {
  const {
    data: booth,
    isLoading: isLoadingBooth,
    isRefetching: isRefetchingBooth,
    refetch
  } = useCustomQuery<IBooth>({
    ...boothsService.getBoothById(id),
    options: {
      enabled: !!id
    }
  });
  return {
    booth,
    isLoadingBooth,
    isRefetchingBooth,
    refetchBooth: refetch
  };
};
