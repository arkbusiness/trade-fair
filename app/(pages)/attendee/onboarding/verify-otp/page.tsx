import { ARK_META } from '@/app/core/shared/constants/common.const';
import { createMetaTitle } from '@/app/core/shared/utils';
import { AttendeeOnboardingVerifyOtpPage } from '@/app/module/attendee/onboarding/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Onboarding'),
  description: ARK_META.description
};

export default async function AttendeeOnboardingVerifyOtp() {
  return <AttendeeOnboardingVerifyOtpPage />;
}
