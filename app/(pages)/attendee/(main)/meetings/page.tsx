import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeMeetingsPage } from '@/app/module/attendee/meetings/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Meetings'),
  description: ARK_META.description
};

export default async function AttendeeMeetings() {
  return <AttendeeMeetingsPage />;
}
