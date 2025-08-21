import { ARK_META, ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { ExhibitorsDetailPage } from '@/app/module/organizer/exhibitors/presentation/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: createMetaTitle('Exhibitors'),
  description: ARK_META.description
};

interface ExhibitorDetailProps {
  params: IQueryParams['params'];
}

export default async function ExhibitorDetail({
  params
}: ExhibitorDetailProps) {
  const awaitedParams = await params;
  const exhibitorId = awaitedParams?.id ?? '';

  if (!exhibitorId) {
    return redirect(ORGANIZER_APP_ROUTES.exhibitors.root());
  }

  return <ExhibitorsDetailPage id={exhibitorId} />;
}
