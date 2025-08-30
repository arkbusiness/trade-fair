import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AppointmentsPage } from '@/app/module/exhibitor/appointments/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Appointments'),
  description: ARK_META.description
};

export default async function Appointments() {
  return <AppointmentsPage />;
}
