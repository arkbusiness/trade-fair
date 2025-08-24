import { createMetaTitle } from '@/app/core/shared/utils';
import { SigninPage } from '@/app/module/auth/sign-in/presentation/pages';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { MainContainer } from './core/shared/components/atoms';

export const metadata: Metadata = {
  title: createMetaTitle('Sign in')
};

export default function Signin() {
  return (
    <MainContainer className="pt-[2.19rem] pb-[1.75rem]">
      <Suspense fallback={<h1>Loading...</h1>}>
        <SigninPage />
      </Suspense>
    </MainContainer>
  );
}
