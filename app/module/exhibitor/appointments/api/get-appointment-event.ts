import { useCustomQuery } from '@/app/core/shared/hooks';
import { isAfter } from 'date-fns';

export interface IAppointmentEvent {
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  venueName: string;
}

export const appointmentEventQueryKeys = {
  base: 'exhibitor-event-info',
  all: () => [appointmentEventQueryKeys.base]
};

const getAppointmentEventQueryOptions = () => ({
  queryKey: appointmentEventQueryKeys.all(),
  url: '/exhibitor/organizer-event-info'
});

export const useAppointmentEvent = () => {
  const {
    data,
    isLoading: isLoadingAppointmentEvent,
    isRefetching: isRefetchingAppointmentEvent,
    refetch
  } = useCustomQuery<IAppointmentEvent>({
    ...getAppointmentEventQueryOptions()
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
