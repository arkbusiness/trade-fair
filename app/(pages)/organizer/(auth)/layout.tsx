import { MainContainer } from '@/app/core/shared/components/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <MainContainer className="pt-[2.19rem] pb-[1.75rem]">
      <Link href="/" className="inline-block max-w-[100px]">
        <Image
          src="/images/logo.svg"
          alt="ARK Logo"
          width={100}
          height={21}
          className="object-contain w-[5rem] sm:w-[6.35rem]"
        />
      </Link>
      <div className="w-full mt-[4.61rem]">{children}</div>
    </MainContainer>
  );
}
