import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeOrdersPage } from '@/app/module/attendee/orders/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Orders & Invoice'),
  description: ARK_META.description
};

export default async function AttendeeOrders() {
  return <AttendeeOrdersPage />;
}
