import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeCataloguesPage } from '@/app/module/attendee/catalogues/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Catalogues'),
  description: ARK_META.description
};

export default async function AttendeeCatalogues() {
  return <AttendeeCataloguesPage />;
}
