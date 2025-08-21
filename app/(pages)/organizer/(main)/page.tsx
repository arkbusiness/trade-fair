import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { OrganizerOverviewPage } from '@/app/module/organizer/overview/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Organizer'),
  description: ARK_META.description
};

export default async function OrganizerOverview() {
  return <OrganizerOverviewPage />;
}
