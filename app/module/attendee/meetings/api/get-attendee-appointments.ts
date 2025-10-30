import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { SlotStatus } from '@/app/module/exhibitor/appointments/hooks';

export interface AttendeeMeeting {
  id: string;
  exhibitorId: string;
  attendeeId: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  waitlistPosition: number | null;
  createdAt: string;
  exhibitor: {
    bootNumber: string;
    companyName: string;
    contactName: string;
  };
}

export const attendeeAppointmentsQueryKeys = {
  base: 'attendee-appointments',
  lists: (filter: Record<string, string>) => [
    attendeeAppointmentsQueryKeys.base,
    filter
  ]
};

export const useAttendeeAppointments = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter
  });

  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    isRefetching: isRefetchingAppointments,
    refetch
  } = useCustomQuery<IPaginatedResponse<AttendeeMeeting>>({
    queryKey: attendeeAppointmentsQueryKeys.lists(filter),
    url: `attendee/appointments${queryParams ? `?${queryParams}` : ''}`
  });

  return {
    appointments: appointments?.data ?? EMPTY_ARRAY,
    isLoadingAppointments,
    isRefetchingAppointments,
    paginationMeta: extractPaginationMeta(appointments),
    refetchAppointments: refetch
  };
};
