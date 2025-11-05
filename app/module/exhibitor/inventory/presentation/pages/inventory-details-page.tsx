import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { DashboardToolbar } from '@/app/core/shared/components/molecules';
import { InventoryForm } from '../organisms';
import { GoBackButton } from '@/app/core/shared/components/atoms';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { getProductByIdQueryOptions } from '../../api/product-query-options';
import type { Inventory } from '../../api/types';

interface InventoryDetailsPageProps {
  id: string;
}

export const InventoryDetailsPage = async ({
  id
}: InventoryDetailsPageProps) => {
  const queryClient = getQueryClient();
  const queryOptions = getProductByIdQueryOptions(id);

  await queryClient.prefetchQuery({
    queryKey: queryOptions.queryKey,
    queryFn: () => {
      return serverFetcher({
        url: queryOptions.url
      });
    }
  });

  const inventory = (await queryClient.getQueryData(
    queryOptions.queryKey
  )) as Inventory;

  if (!inventory) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-5">
        <div>
          <GoBackButton route={EXHIBITOR_APP_ROUTES.inventory.root()} />
          <DashboardToolbar
            title={inventory?.name || 'Product'}
            description="View product information."
          />
        </div>

        <InventoryForm inventory={inventory} isReadOnly />
      </div>
    </HydrationBoundary>
  );
};
