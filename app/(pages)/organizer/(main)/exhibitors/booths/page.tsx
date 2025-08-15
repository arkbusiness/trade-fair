import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { BoothsPage } from '@/module/organizer/booths/presentation/pages/booths-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Booths'),
  description: ARK_META.description
};

export default async function Booths() {
  return <BoothsPage />;
}
