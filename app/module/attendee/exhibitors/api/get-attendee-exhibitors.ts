import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { AttendeeExhibitor } from '../types';

export const getAttendeeExhibitorsQueryOptions = ({
  filter
}: {
  filter: Record<string, string>;
}) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: ['attendee-exhibitors', queryParams],
    url: `/attendee/exhibitors${queryParams ? `?${queryParams}` : ''}`
  };
};

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
