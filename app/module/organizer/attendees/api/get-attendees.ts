import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { getAttendeesQueryOptions } from './attendees-query-options';
import type { IAttendee } from './types';

export const useOrganizerAttendees = (filter: Record<string, string> = {}) => {
  const {
    data: attendees,
    isLoading: isLoadingAttendees,
    isRefetching: isRefetchingAttendees,
    refetch
  } = useCustomQuery<IPaginatedResponse<IAttendee>>({
    ...getAttendeesQueryOptions(filter)
  });

  return {
    attendees: attendees?.data ?? EMPTY_ARRAY,
    isLoadingAttendees,
    isRefetchingAttendees,
    paginationMeta: extractPaginationMeta(attendees),
    refetchAttendees: refetch
  };
};
