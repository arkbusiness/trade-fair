import { ARK_META, ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { getCatalogueQueryOptions } from '@/app/module/attendee/catalogues/api/catalogue-query-options';
import { CatalogueDetailsPage } from '@/app/module/attendee/catalogues/presentation/pages';
import { Inventory } from '@/app/module/exhibitor/inventory/api/types';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

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

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getCatalogueQueryOptions(catalogueId).queryKey,
    queryFn: () => {
      return serverFetcher({
        url: getCatalogueQueryOptions(catalogueId).url
      });
    }
  });

  const catalogue = (await queryClient.getQueryData(
    getCatalogueQueryOptions(catalogueId).queryKey
  )) as Inventory;

  if (!catalogue) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogueDetailsPage catalogueId={catalogueId} />
    </HydrationBoundary>
  );
}
