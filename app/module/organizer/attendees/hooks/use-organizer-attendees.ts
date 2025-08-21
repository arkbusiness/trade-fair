import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { organizerAttendeesService } from '../services';

export interface IOrganizerAttendee {
  id: string;
  email: string;
  inviteCode: string;
  used: boolean;
  status: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  logoUrl: string;
  phone: string;
  contactName: string;
  registeredAt: string;
  username: string;
  inviteLink: string;
  chatUnlocked: boolean;
}

export const useOrganizerAttendees = (filter: Record<string, string> = {}) => {
  const {
    data: attendees,
    isLoading: isLoadingAttendees,
    isRefetching: isRefetchingAttendees,
    refetch
  } = useCustomQuery<IPaginatedResponse<IOrganizerAttendee>>({
    ...organizerAttendeesService.getAttendees(filter)
  });
  return {
    attendees: attendees?.data ?? EMPTY_ARRAY,
    isLoadingAttendees,
    isRefetchingAttendees,
    paginationMeta: extractPaginationMeta(attendees),
    refetchAttendees: refetch
  };
};

export const useOrganizerAttendeeById = (id: string) => {
  const {
    data: attendee,
    isLoading: isLoadingAttendee,
    isRefetching: isRefetchingAttendee,
    refetch
  } = useCustomQuery<IOrganizerAttendee>({
    ...organizerAttendeesService.getAttendeeById(id)
  });
  return {
    attendee,
    isLoadingAttendee,
    isRefetchingAttendee,
    refetchAttendee: refetch
  };
};
