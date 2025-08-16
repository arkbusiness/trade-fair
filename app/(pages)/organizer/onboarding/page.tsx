import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { OrganizerOnboardingPage } from '@/app/module/organizer-onboarding/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Onboarding'),
  description: ARK_META.description
};

export default async function OrganizerOnboarding() {
  return <OrganizerOnboardingPage />;
}
