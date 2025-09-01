import { useCustomQuery } from '@/app/core/shared/hooks';
import { appointmentsService } from '../services/appointments.service';
import { IAttendee } from '@/app/module/organizer/attendees/hooks';
import { IExhibitor } from '@/app/module/organizer/exhibitors/hooks';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { IPaginatedResponse } from '@/app/core/shared/types';

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
