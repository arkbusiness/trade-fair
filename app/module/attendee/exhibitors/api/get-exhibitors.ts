import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { AttendeeExhibitor } from '../types';
import { getAttendeeExhibitorsQueryOptions } from './exhibitor-query-options';

export const useAttendeeExhibitors = (filter: Record<string, string>) => {
  const {
    data: exhibitors,
    isLoading: isLoadingExhibitor,
    isRefetching: isRefetchingExhibitor,
    refetch
  } = useCustomQuery<IPaginatedResponse<AttendeeExhibitor>>({
    ...getAttendeeExhibitorsQueryOptions({
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
