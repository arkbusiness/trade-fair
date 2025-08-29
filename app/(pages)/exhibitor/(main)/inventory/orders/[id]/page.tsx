import { ARK_META, EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { OrderDetailsPage } from '@/app/module/exhibitor/orders/presentation/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: createMetaTitle('Order'),
  description: ARK_META.description
};

interface OrderDetailsProps {
  params: IQueryParams['params'];
}

export default async function OrderDetails({ params }: OrderDetailsProps) {
  const awaitedParams = await params;
  const orderId = awaitedParams?.id ?? '';

  if (!orderId) {
    return redirect(EXHIBITOR_APP_ROUTES.inventory.orders.root());
  }

  return <OrderDetailsPage id={orderId} />;
}
