import { createMetaTitle } from '@/app/core/shared/utils';
import { SigninPage } from '@/module/auth/sign-in/presentation/pages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: createMetaTitle('Sign in')
};

export default function Signin() {
  return <SigninPage />;
}
