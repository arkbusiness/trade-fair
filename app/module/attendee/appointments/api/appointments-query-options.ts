import { FilterParams } from '@/app/core/shared/types';
import { buildQueryParams } from '@/app/core/shared/utils';

export type AttendeeAppointmentsSlotsParams = {
  exhibitorId: string;
  filter: FilterParams;
};

export const getAttendeeAppointmentSlotsQueryOptions = ({
  exhibitorId,
  filter
}: AttendeeAppointmentsSlotsParams) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: ['attendee-appointments-slots', queryParams, exhibitorId],
    url: `/attendee/appointments/slots/${exhibitorId}${queryParams ? `?${queryParams}` : ''}`
  };
};
