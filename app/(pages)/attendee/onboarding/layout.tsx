import { MainContainer } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { SigninPrompt } from '@/app/module/auth/sign-in/presentation/atoms';
import Image from 'next/image';
import Link from 'next/link';

export default async function AttendeeOnboardingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <MainContainer className="pt-[2.19rem] pb-[1.75rem]">
      <div className="flex justify-between gap-5 items-center flex-wrap">
        <Link
          href={ATTENDEE_APP_ROUTES.root()}
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
      <div className="flex flex-col justify-center w-full mt-[1.44rem] mb-[11.25rem]">
        <SigninPrompt href={ATTENDEE_APP_ROUTES.auth.login()} />
        <div className="w-full mt-[4.61rem]">{children}</div>
      </div>
    </MainContainer>
  );
}
