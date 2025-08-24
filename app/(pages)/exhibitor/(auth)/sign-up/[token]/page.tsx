import { createMetaTitle } from '@/app/core/shared/utils';
import { ExhibitorSignupPage } from '@/app/module/auth/exhibitor-signup/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Sign up')
};

export default function ExhibitorSignup() {
  return <ExhibitorSignupPage />;
}
