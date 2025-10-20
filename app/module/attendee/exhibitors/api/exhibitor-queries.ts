import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { AttendeeExhibitor } from '../types';
import {
  getAttendeeExhibitorsQueryOptions,
  getAttendeeExhibitorByIdQueryOptions,
  getAttendeeExhibitorScannedBoothOptions,
  getAttendeeFavouriteExhibitorsQueryOptions
} from './exhibitor-query-options';

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

export const useAttendeeExhibitorById = (exhibitorId: string) => {
  const {
    data: exhibitor,
    isLoading: isLoadingExhibitor,
    isRefetching: isRefetchingExhibitor,
    refetch
  } = useCustomQuery<AttendeeExhibitor>({
    ...getAttendeeExhibitorByIdQueryOptions({
      exhibitorId
    })
  });
  return {
    exhibitor,
    isLoadingExhibitor,
    isRefetchingExhibitor,
    refetchExhibitor: refetch
  };
};

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

export const useAttendeeExhibitorScanBooth = (exhibitorId: string) => {
  const { data, isLoading, isRefetching, refetch } = useCustomQuery<{
    scanned: boolean;
  }>({
    ...getAttendeeExhibitorScannedBoothOptions({
      exhibitorId
    }),
    options: {
      enabled: !!exhibitorId
    }
  });

  return {
    isScanned: data?.scanned || false,
    isLoadingExhibitorScanBooth: isLoading,
    isRefetchingExhibitorScanBooth: isRefetching,
    refetchExhibitorScanBooth: refetch
  };
};
