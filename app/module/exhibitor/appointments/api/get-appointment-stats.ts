import { useCustomQuery } from '@/app/core/shared/hooks';

export type AppointmentStats = {
  availableCount: number;
  bookedCount: number;
  waitlistedCount: number;
  cancelledCount: number;
  completedCount: number;
};

export const appointmentStatsQueryKeys = {
  base: 'exhibitor-appointments-stats',
  all: () => [appointmentStatsQueryKeys.base]
};

const getAppointmentStatsQueryOptions = () => ({
  queryKey: appointmentStatsQueryKeys.all(),
  url: '/exhibitor/appointments/dashboard'
});

export const useAppointmentsStats = () => {
  const {
    data,
    isLoading: isLoadingAppointmentsStats,
    isRefetching: isRefetchingAppointmentsStats,
    refetch
  } = useCustomQuery<AppointmentStats>({
    ...getAppointmentStatsQueryOptions()
  });

  return {
    appointmentsStats: data,
    isLoadingAppointmentsStats,
    isRefetchingAppointmentsStats,
    refetchAppointmentsStats: refetch
  };
};
