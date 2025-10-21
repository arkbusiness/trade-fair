import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { FilterParams, IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { getAttendeeAppointmentSlotsQueryOptions } from './appointments-query-options';
import { IAttendeeMeeting } from '../../meetings/api';

type AttendeeAppointmentsSlotsParams = {
  exhibitorId: string;
  filter: FilterParams;
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
  } = useCustomQuery<IPaginatedResponse<IAttendeeMeeting>>({
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
