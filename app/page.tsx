import { createMetaTitle } from '@/app/core/shared/utils';
import { OrganizerSigninPage } from '@/app/module/auth/sign-in/presentation/pages';
import { Metadata } from 'next';
import { MainContainer } from './core/shared/components/atoms';
import { ORGANIZER_APP_ROUTES } from './core/shared/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: createMetaTitle('Sign in')
};

export default function Signin() {
  return (
    <MainContainer className="pt-[2.19rem] pb-[1.75rem]">
      <div className="flex justify-between gap-5 items-center flex-wrap">
        <Link
          href={ORGANIZER_APP_ROUTES.root()}
          className="inline-block max-w-[100px]"
        >
          <Image
            src="/images/logo.svg"
            alt="ARK Logo"
            width={100}
            height={21}
            className="object-contain w-[5rem] sm:w-[6.35rem]"
          />
        </Link>
      </div>
      <div className="w-full mt-[4.61rem]">
        <Suspense fallback={<h1>Loading...</h1>}>
          <OrganizerSigninPage />
        </Suspense>
      </div>
    </MainContainer>
  );
}
