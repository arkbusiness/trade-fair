import { Spinner } from '@/app/core/shared/components/atoms';
import { ARK_META, ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { CatalogueDetailsPage } from '@/app/module/attendee/catalogues/presentation/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: createMetaTitle('Catalogue'),
  description: ARK_META.description
};

interface CatalogueDetailsProps {
  params: IQueryParams['params'];
}

export default async function AttendeeCatalogueDetails({
  params
}: CatalogueDetailsProps) {
  const awaitedParams = await params;
  const catalogueId = awaitedParams?.id ?? '';

  if (!catalogueId) {
    return redirect(ATTENDEE_APP_ROUTES.orders.root());
  }

  return (
    <Suspense fallback={<Spinner />}>
      <CatalogueDetailsPage catalogueId={catalogueId} />
    </Suspense>
  );
}
