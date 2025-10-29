import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeSettingsPage } from '@/app/module/attendee/settings/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Settings'),
  description: ARK_META.description
};

export default async function AttendeeSettings() {
  return <AttendeeSettingsPage />;
}
