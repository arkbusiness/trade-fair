import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { organizerAttendeesService } from '../services';

export interface IAttendee {
  id: string;
  email: string;
  inviteCode: string;
  used: boolean;
  status: string;
  expiresAt: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  logoUrl: string;
  phone: string;
  contactName: string;
  interests: string[];
  registeredAt: string;
  username: string;
  inviteLink: string;
  chatUnlocked: boolean;
  registrationTimeLine: {
    registered: string;
    invited: string;
  };
}

export const useOrganizerAttendees = (filter: Record<string, string> = {}) => {
  const {
    data: attendees,
    isLoading: isLoadingAttendees,
    isRefetching: isRefetchingAttendees,
    refetch
  } = useCustomQuery<IPaginatedResponse<IAttendee>>({
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
  } = useCustomQuery<IAttendee>({
    ...organizerAttendeesService.getAttendeeById(id)
  });
  return {
    attendee,
    isLoadingAttendee,
    isRefetchingAttendee,
    refetchAttendee: refetch
  };
};
