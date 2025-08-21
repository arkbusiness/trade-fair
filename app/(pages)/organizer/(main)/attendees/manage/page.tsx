import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeesPage } from '@/app/module/organizer/attendees/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Attendees'),
  description: ARK_META.description
};

export default async function Attendees() {
  return <AttendeesPage />;
}
