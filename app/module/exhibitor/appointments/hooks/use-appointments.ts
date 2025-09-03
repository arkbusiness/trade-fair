import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { IAttendee } from '@/app/module/organizer/attendees/hooks';
import { IExhibitor } from '@/app/module/organizer/exhibitors/hooks';
import { appointmentsService } from '../services/appointments.service';
import { isAfter } from 'date-fns';

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

interface AppointmentStats {
  availableCount: number;
  bookedCount: number;
  waitlistedCount: number;
  cancelledCount: number;
  completedCount: number;
}

export interface IAppointmentEvent {
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  venueName: string;
}

export const APPOINTMENT_LIMIT = 5;

export const useAppointmentSlot = (filter: Record<string, string> = {}) => {
  const {
    data: slots,
    isLoading: isLoadingAppointments,
    isRefetching: isRefetchingAppointments,
    refetch
  } = useCustomQuery<IPaginatedResponse<IAppointmentSlot>>({
    ...appointmentsService.getAppointmentSlots({
      ...filter,
      limit: APPOINTMENT_LIMIT.toString()
    })
  });
  return {
    slots: slots?.data ?? EMPTY_ARRAY,
    isLoadingAppointments,
    isRefetchingAppointments,
    paginationMeta: extractPaginationMeta(slots),
    refetchAppointments: refetch
  };
};

export const useAppointmentsStats = () => {
  const {
    data,
    isLoading: isLoadingAppointmentsStats,
    isRefetching: isRefetchingAppointmentsStats,
    refetch
  } = useCustomQuery<AppointmentStats>({
    ...appointmentsService.getStats()
  });

  return {
    appointmentsStats: data,
    isLoadingAppointmentsStats,
    isRefetchingAppointmentsStats,
    refetchAppointmentsStats: refetch
  };
};

export const useAppointmentEvent = () => {
  const {
    data,
    isLoading: isLoadingAppointmentEvent,
    isRefetching: isRefetchingAppointmentEvent,
    refetch
  } = useCustomQuery<IAppointmentEvent>({
    ...appointmentsService.getEvent()
  });

  const isEventExpired = data ? isAfter(new Date(), data?.eventEndDate) : false;

  return {
    event: data,
    eventStartDate:
      !isEventExpired && data?.eventStartDate
        ? new Date(data.eventStartDate)
        : undefined,
    eventEndDate:
      !isEventExpired && data?.eventEndDate
        ? new Date(data.eventEndDate)
        : undefined,
    isEventExpired,
    isLoadingAppointmentEvent,
    isRefetchingAppointmentEvent,
    refetchAppointmentEvent: refetch
  };
};
