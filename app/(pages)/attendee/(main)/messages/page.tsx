import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeMessagesPage } from '@/app/module/attendee/messages/presentation/pages/attendee-messages-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Messages'),
  description: ARK_META.description
};

export default async function Messages() {
  return <AttendeeMessagesPage />;
}
