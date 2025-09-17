import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { inventoryService } from '../../services';
import { Inventory } from '../../hooks';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { DashboardToolbar } from '@/app/core/shared/components/molecules';
import { InventoryForm } from '../organisms';

interface EditInventoryPageProps {
  id: string;
}

export const EditInventoryPage = async ({ id }: EditInventoryPageProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: inventoryService.getById(id).queryKey,
    queryFn: () => {
      return serverFetcher({
        url: inventoryService.getById(id).url
      });
    }
  });

  const inventory = (await queryClient.getQueryData(
    inventoryService.getById(id).queryKey
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
