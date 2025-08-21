import { ARK_META, ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeesDetailPage } from '@/app/module/organizer/attendees/presentation/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: createMetaTitle('Attendees'),
  description: ARK_META.description
};

interface AttendeesDetailProps {
  params: IQueryParams['params'];
}

export default async function AttendeesDetail({
  params
}: AttendeesDetailProps) {
  const awaitedParams = await params;
  const attendeeId = awaitedParams?.id ?? '';

  if (!attendeeId) {
    return redirect(ORGANIZER_APP_ROUTES.attendees.root());
  }

  return <AttendeesDetailPage id={attendeeId} />;
}
