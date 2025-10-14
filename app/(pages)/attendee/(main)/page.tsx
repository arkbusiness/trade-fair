import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeOverviewPage } from '@/app/module/attendee/overview/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Attendee Overview'),
  description: ARK_META.description
};

export default async function AttendeeOverview() {
  return <AttendeeOverviewPage />;
}
