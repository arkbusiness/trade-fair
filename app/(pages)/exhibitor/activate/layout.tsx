import { MainContainer } from '@/app/core/shared/components/atoms';
import Image from 'next/image';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function ExhibitorActivateLayout({
  children
}: AuthLayoutProps) {
  return (
    <MainContainer className="pt-[2.19rem] pb-[1.75rem]">
      <div className="flex justify-between gap-5 items-center flex-wrap">
        <div className="inline-block max-w-[100px]">
          <Image
            src="/images/logo.svg"
            alt="ARK Logo"
            width={100}
            height={21}
            className="object-contain w-[5rem] sm:w-[6.35rem]"
          />
        </div>
      </div>
      <div className="w-full mt-[4.61rem]">{children}</div>
    </MainContainer>
  );
}
