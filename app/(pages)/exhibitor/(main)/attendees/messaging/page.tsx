import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { MessagingPage } from '@/app/module/exhibitor/messaging/presentation/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Messaging'),
  description: ARK_META.description
};

export default async function Messaging() {
  return <MessagingPage />;
}
