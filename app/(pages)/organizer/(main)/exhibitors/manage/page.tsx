import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { ExhibitorsPage } from '@/module/organizer/exhibitors/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Exhibitors'),
  description: ARK_META.description
};

export default async function Exhibitors() {
  return <ExhibitorsPage />;
}
