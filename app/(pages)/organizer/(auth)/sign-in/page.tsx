import { createMetaTitle } from '@/app/core/shared/utils';
import { OrganizerSigninPage } from '@/module/auth/sign-in/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Sign in')
};

export default function Signin() {
  return <OrganizerSigninPage />;
}
