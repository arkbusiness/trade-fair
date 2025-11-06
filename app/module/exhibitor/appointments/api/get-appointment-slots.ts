import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { FilterParams, IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { IAttendee } from '@/app/module/organizer/attendees/hooks';
import { IExhibitor } from '@/app/module/organizer/exhibitors/api';

export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  WAITLISTED = 'WAITLISTED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface IAppointmentSlot {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  waitlistPosition: number | null;
  attendee: IAttendee;
  attendeeId: string;
  exhibitor: IExhibitor;
  exhibitorId: string;
  status: SlotStatus;
}

export const APPOINTMENT_LIMIT = 5;

export const appointmentSlotsQueryKeys = {
  base: 'exhibitor-appointments',
  lists: (filter: FilterParams) => [
    appointmentSlotsQueryKeys.base,
    { ...filter }
  ]
};

const getAppointmentSlotsQueryOptions = (filter: FilterParams) => {
  const paginatedFilter = {
    ...filter,
    limit: filter.limit || APPOINTMENT_LIMIT.toString()
  };

  const queryParams = buildQueryParams({
    params: paginatedFilter
  });

  return {
    queryKey: appointmentSlotsQueryKeys.lists(paginatedFilter),
    url: `/exhibitor/appointments/slots${queryParams ? `?${queryParams}` : ''}`
  };
};

export const useAppointmentSlots = (filter: FilterParams = {}) => {
  const {
    data: slots,
    isLoading: isLoadingAppointments,
    isRefetching: isRefetchingAppointments,
    refetch
  } = useCustomQuery<IPaginatedResponse<IAppointmentSlot>>({
    ...getAppointmentSlotsQueryOptions(filter)
  });

  return {
    slots: slots?.data ?? EMPTY_ARRAY,
    isLoadingAppointments,
    isRefetchingAppointments,
    paginationMeta: extractPaginationMeta(slots),
    refetchAppointments: refetch
  };
};
