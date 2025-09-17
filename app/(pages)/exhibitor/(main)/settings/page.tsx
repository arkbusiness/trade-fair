import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { ExhibitorSettingsPage } from '@/app/module/exhibitor/settings/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Settings'),
  description: ARK_META.description
};

export default async function Settings() {
  return <ExhibitorSettingsPage />;
}
