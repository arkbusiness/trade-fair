'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { AttendeeMeetingsItems, AttendeeMeetingsTab } from '../organisms';
import { OverlaySpinner } from '@/app/core/shared/components/molecules';
import { useAttendeeAppointments } from '../../api/get-attendee-appointments';

export const AttendeeMeetingsPage = () => {
  const { searchParamsObject } = useSetParams();

  const appointmentsQuery = {
    status: searchParamsObject.status ?? '',
    page: searchParamsObject.page ?? '1',
    limit: '5'
  };

  const {
    appointments,
    isLoadingAppointments,
    paginationMeta,
    isRefetchingAppointments
  } = useAttendeeAppointments(appointmentsQuery);

  const { total } = paginationMeta;

  const isLoading = isLoadingAppointments;

  return (
    <>
      {isRefetchingAppointments && <OverlaySpinner />}
      <AttendeeMeetingsTab totalAppointments={total} isLoading={isLoading} />
      <div className="mt-4">
        <AttendeeMeetingsItems
          appointments={appointments}
          isLoading={isLoading}
          pageCount={paginationMeta.pages}
          page={paginationMeta.page}
        />
      </div>
    </>
  );
};
