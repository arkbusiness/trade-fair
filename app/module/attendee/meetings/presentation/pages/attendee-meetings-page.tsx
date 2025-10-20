'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { AttendeeMeetingsItems, AttendeeMeetingsTab } from '../organisms';
import { useAttendeeAppointments } from '../../api';
import { OverlaySpinner } from '@/app/core/shared/components/molecules';

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
    isRefetchingAppointments,
    refetchAppointments
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
          handleRefetch={refetchAppointments}
        />
      </div>
    </>
  );
};
