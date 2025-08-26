import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { InventoryPage } from '@/app/module/exhibitor/inventory/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Inventory'),
  description: ARK_META.description
};

export default async function Inventory() {
  return <InventoryPage />;
}
