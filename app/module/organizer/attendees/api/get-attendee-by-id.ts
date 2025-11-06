import { useCustomQuery } from '@/app/core/shared/hooks';
import { getAttendeeByIdQueryOptions } from './attendees-query-options';
import type { IAttendee } from './types';

export const useOrganizerAttendeeById = (id: string) => {
  const {
    data: attendee,
    isLoading: isLoadingAttendee,
    isRefetching: isRefetchingAttendee,
    refetch
  } = useCustomQuery<IAttendee>({
    ...getAttendeeByIdQueryOptions(id)
  });

  return {
    attendee,
    isLoadingAttendee,
    isRefetchingAttendee,
    refetchAttendee: refetch
  };
};
