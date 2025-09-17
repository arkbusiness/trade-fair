import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { OrdersPage } from '@/app/module/exhibitor/orders/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Orders & Invoice'),
  description: ARK_META.description
};

export default async function Orders() {
  return <OrdersPage />;
}
