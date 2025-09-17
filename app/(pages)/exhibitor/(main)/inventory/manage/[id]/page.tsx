import { ARK_META, EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { InventoryDetailsPage } from '@/app/module/exhibitor/inventory/presentation/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: createMetaTitle('Inventory'),
  description: ARK_META.description
};

interface InventoryDetailsProps {
  params: IQueryParams['params'];
}

export default async function InventoryDetails({
  params
}: InventoryDetailsProps) {
  const awaitedParams = await params;
  const inventoryId = awaitedParams?.id ?? '';

  if (!inventoryId) {
    return redirect(EXHIBITOR_APP_ROUTES.inventory.root());
  }

  return <InventoryDetailsPage id={inventoryId} />;
}
