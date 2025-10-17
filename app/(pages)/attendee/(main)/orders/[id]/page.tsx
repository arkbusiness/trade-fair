import { ARK_META, ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { IQueryParams } from '@/app/core/shared/types';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeOrderDetailPage } from '@/app/module/attendee/orders/presentation/pages';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: createMetaTitle('Order'),
  description: ARK_META.description
};

interface OrderDetailsProps {
  params: IQueryParams['params'];
}

export default async function AttendeeOrderDetails({
  params
}: OrderDetailsProps) {
  const awaitedParams = await params;
  const orderId = awaitedParams?.id ?? '';

  if (!orderId) {
    return redirect(ATTENDEE_APP_ROUTES.orders.root());
  }

  return <AttendeeOrderDetailPage id={orderId} />;
}
