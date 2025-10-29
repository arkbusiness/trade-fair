import { Spinner } from '@/app/core/shared/components/atoms';
import { ARK_META, ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeAppointmentsPage } from '@/app/module/attendee/appointments/presentation/page';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: createMetaTitle('Appointments'),
  description: ARK_META.description
};

interface ExhibitorAppointmentProps {
  params: IQueryParams['params'];
}

export default async function AttendeeExhibitorAppointment({
  params
}: ExhibitorAppointmentProps) {
  const awaitedParams = await params;
  const exhibitorId = awaitedParams?.id ?? '';

  if (!exhibitorId) {
    return redirect(ATTENDEE_APP_ROUTES.orders.root());
  }

  return (
    <Suspense fallback={<Spinner />}>
      <AttendeeAppointmentsPage exhibitorId={exhibitorId} />
    </Suspense>
  );
}
