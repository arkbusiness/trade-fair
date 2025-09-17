import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AddInventoryPage } from '@/app/module/exhibitor/inventory/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Add Inventory'),
  description: ARK_META.description
};

export default async function AddInventory() {
  return <AddInventoryPage />;
}
