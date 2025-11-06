import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { getBoothsQueryOptions } from './booths-query-options';
import type { IBooth } from './types';

export const useBooths = (filter: Record<string, string> = {}) => {
  const {
    data: booths,
    isLoading: isLoadingBooths,
    isRefetching: isRefetchingBooths,
    refetch
  } = useCustomQuery<IPaginatedResponse<IBooth>>({
    ...getBoothsQueryOptions(filter)
  });

  return {
    booths: booths?.data ?? EMPTY_ARRAY,
    isLoadingBooths,
    isRefetchingBooths,
    paginationMeta: extractPaginationMeta(booths),
    refetchBooths: refetch
  };
};
