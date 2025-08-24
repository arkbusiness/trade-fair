import { MainContainer } from '@/app/core/shared/components/atoms';
import { COOKIE_KEYS, EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function ExhibitorAuthLayout({
  children
}: AuthLayoutProps) {
  const accessToken = (await cookies()).get(COOKIE_KEYS.auth.token)?.value;

  if (accessToken) {
    return redirect(EXHIBITOR_APP_ROUTES.root());
  }

  return (
    <MainContainer className="pt-[2.19rem] pb-[1.75rem]">
      <div className="flex justify-between gap-5 items-center flex-wrap">
        <Link
          href={EXHIBITOR_APP_ROUTES.root()}
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
      <div className="w-full mt-[4.61rem]">{children}</div>
    </MainContainer>
  );
}
