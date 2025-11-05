import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { getExhibitorsQueryOptions } from './exhibitors-query-options';
import type { IExhibitor } from './types';

export const useOrganizerExhibitors = (filter: Record<string, string> = {}) => {
  const {
    data: exhibitors,
    isLoading: isLoadingExhibitors,
    isRefetching: isRefetchingExhibitors,
    refetch
  } = useCustomQuery<IPaginatedResponse<IExhibitor>>({
    ...getExhibitorsQueryOptions(filter)
  });

  return {
    exhibitors: exhibitors?.data ?? EMPTY_ARRAY,
    isLoadingExhibitors,
    isRefetchingExhibitors,
    paginationMeta: extractPaginationMeta(exhibitors),
    refetchExhibitors: refetch
  };
};
