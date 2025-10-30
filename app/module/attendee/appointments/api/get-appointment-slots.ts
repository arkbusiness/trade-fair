import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { FilterParams, IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { AttendeeMeeting } from '../../meetings/api/get-attendee-appointments';

export type AttendeeAppointmentsSlotsParams = {
  exhibitorId: string;
  filter: FilterParams;
};

export const attendeeAppointmentSlotsQueryKeys = {
  base: 'attendee-appointments-slots',
  lists: (exhibitorId: string, filter: FilterParams) => [
    attendeeAppointmentSlotsQueryKeys.base,
    { exhibitorId, ...filter }
  ]
};

const getAttendeeAppointmentSlotsQueryOptions = ({
  exhibitorId,
  filter
}: AttendeeAppointmentsSlotsParams) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: attendeeAppointmentSlotsQueryKeys.lists(exhibitorId, filter),
    url: `/attendee/appointments/slots/${exhibitorId}${queryParams ? `?${queryParams}` : ''}`
  };
};

export const useAttendeeAppointmentsSlots = ({
  exhibitorId,
  filter
}: AttendeeAppointmentsSlotsParams) => {
  const {
    data: slots,
    isLoading: isLoadingSlots,
    isRefetching: isRefetchingSlots,
    refetch
  } = useCustomQuery<IPaginatedResponse<AttendeeMeeting>>({
    ...getAttendeeAppointmentSlotsQueryOptions({
      filter,
      exhibitorId
    }),
    options: {
      enabled: !!exhibitorId
    }
  });

  return {
    slots: slots?.data ?? EMPTY_ARRAY,
    isLoadingSlots,
    isRefetchingSlots,
    paginationMeta: extractPaginationMeta(slots),
    refetchSlots: refetch
  };
};
