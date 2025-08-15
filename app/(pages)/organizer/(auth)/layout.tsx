import { MainContainer } from '@/app/core/shared/components/atoms';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { SigninPrompt } from '@/module/auth/sign-in/presentation/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
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
        <SigninPrompt href={ORGANIZER_APP_ROUTES.auth.login()} />
      </div>
      <div className="w-full mt-[4.61rem]">{children}</div>
    </MainContainer>
  );
}
