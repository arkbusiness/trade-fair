import { createMetaTitle } from '@/app/core/shared/utils';
import { OrganizerSignupPage } from '@/app/module/auth/organizer-signup/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Sign up')
};

export default function Signup() {
  return <OrganizerSignupPage />;
}
