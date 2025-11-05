import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { DashboardToolbar } from '@/app/core/shared/components/molecules';
import { InventoryForm } from '../organisms';
import { getProductByIdQueryOptions } from '../../api/product-query-options';
import type { Inventory } from '../../api/types';

interface EditInventoryPageProps {
  id: string;
}

export const EditInventoryPage = async ({ id }: EditInventoryPageProps) => {
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
        <DashboardToolbar
          title={inventory?.name || 'Product'}
          description="Edit product information."
        />
        <InventoryForm inventory={inventory} />
      </div>
    </HydrationBoundary>
  );
};
