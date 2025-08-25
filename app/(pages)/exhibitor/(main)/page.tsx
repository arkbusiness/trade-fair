import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import ExhibitorOverviewPage from '@/app/module/exhibitor/overview/presentation/pages/exhibitor-overview-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Exhibitor'),
  description: ARK_META.description
};

export default async function ExhibitorOverview() {
  return <ExhibitorOverviewPage />;
}
