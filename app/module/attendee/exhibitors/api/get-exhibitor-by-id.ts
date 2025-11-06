import { useCustomQuery } from '@/app/core/shared/hooks';
import { AttendeeExhibitor } from '../types';
import { getAttendeeExhibitorByIdQueryOptions } from './exhibitor-query-options';

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
