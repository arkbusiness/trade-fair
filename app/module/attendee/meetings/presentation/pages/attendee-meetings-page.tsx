'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { AttendeeMeetingsItems, AttendeeMeetingsTab } from '../organisms';
import { useAttendeeAppointments } from '../../api';

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
    refetchAppointments
  } = useAttendeeAppointments(appointmentsQuery);

  const { total } = paginationMeta;

  const isLoading = isLoadingAppointments;

  return (
    <>
      <AttendeeMeetingsTab totalAppointments={total} isLoading={isLoading} />
      <div className="mt-4">
        <AttendeeMeetingsItems
          appointments={appointments}
          isLoading={isLoading}
          pageCount={paginationMeta.pages}
          page={paginationMeta.page}
          handleRefetch={refetchAppointments}
        />
      </div>
    </>
  );
};
