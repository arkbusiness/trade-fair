import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { AttendeeExhibitor } from '../types';
import { getAttendeeFavouriteExhibitorsQueryOptions } from './exhibitor-query-options';

export const useAttendeeFavouriteExhibitors = (
  filter: Record<string, string>
) => {
  const {
    data: exhibitors,
    isLoading: isLoadingExhibitor,
    isRefetching: isRefetchingExhibitor,
    refetch
  } = useCustomQuery<IPaginatedResponse<AttendeeExhibitor>>({
    ...getAttendeeFavouriteExhibitorsQueryOptions({
      filter
    })
  });
  return {
    exhibitors: exhibitors?.data ?? EMPTY_ARRAY,
    isLoadingExhibitor,
    isRefetchingExhibitor,
    paginationMeta: extractPaginationMeta(exhibitors),
    refetchExhibitor: refetch
  };
};
