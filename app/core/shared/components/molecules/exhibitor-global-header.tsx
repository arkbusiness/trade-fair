'use client';

import { AlignLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ORGANIZER_APP_ROUTES } from '../../constants';
import { useExhibitorUser } from '../../hooks/api/use-exhibitor-user';
import { useSidebar } from '../atoms';
import { ImagePlaceholder } from '../atoms/image-placeholder';

export enum ExhibitorGlobalHeaderModalType {
  NONE,
  CONTACT_US
}

export const ExhibitorGlobalHeader = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = useExhibitorUser();

  const { logoUrl } = user ?? {
    logoUrl: null
  };

  return (
    <header className="flex flex-col h-[var(--header-height)] fixed top-0 w-full z-20">
      <div className="h-[3.75rem] flex items-center justify-between gap-2 bg-background px-[1.13rem] ">
        <Link href={ORGANIZER_APP_ROUTES.root()}>
          <Image
            src="/images/logo.svg"
            alt="ARK Logo"
            width={80}
            height={21}
            className="object-contain w-[5rem] sm:w-[5rem]"
          />
        </Link>
        <a
          href="mailto:info@storeatark.com"
          className="flex items-center gap-1 cursor-pointer"
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.7334 2.6665C11.2268 2.6665 11.9735 2.66687 12.5439 2.95752C13.0456 3.21316 13.4533 3.62089 13.709 4.12256C13.9996 4.69298 14 5.43968 14 6.93311V7.73291C14 9.22627 13.9996 9.97304 13.709 10.5435C13.4533 11.0452 13.0457 11.4538 12.5439 11.7095C11.9735 12 11.2267 11.9995 9.7334 11.9995H4.94336C4.76655 11.9995 4.5967 12.0698 4.47168 12.1948L3.1377 13.5288C2.71769 13.9482 2.0001 13.6508 2 13.0571V6.93311C2 5.43968 2.00037 4.69298 2.29102 4.12256C2.54666 3.62089 2.95439 3.21316 3.45605 2.95752C4.02648 2.66687 4.77317 2.6665 6.2666 2.6665H9.7334ZM6 7.99951C5.63191 7.99951 5.33317 8.29845 5.33301 8.6665C5.33318 9.03454 5.63192 9.33252 6 9.33252H8C8.36808 9.33252 8.66682 9.03454 8.66699 8.6665C8.66683 8.29845 8.36809 7.99951 8 7.99951H6ZM6 5.33252C5.63191 5.33252 5.33317 5.63146 5.33301 5.99951C5.33301 6.3677 5.63181 6.6665 6 6.6665H10C10.3682 6.6665 10.667 6.3677 10.667 5.99951C10.6668 5.63146 10.3681 5.33252 10 5.33252H6Z"
              fill="black"
            />
          </svg>
          <span className="text-foreground font-medium">Help</span>
        </a>
      </div>
      <div className="flex justify-between items-center py-[1rem] px-[1.13rem]  gap-x-4 w-full relative h-[5.5rem] bg-[linear-gradient(90deg,_var(--light-blue)_0%,_var(--dark-blue)_100%)]">
        <div className="flex gap-3 ">
          <button
            onClick={toggleSidebar}
            className="text-background cursor-pointer"
          >
            <AlignLeft size={24} />
          </button>
          <div className="flex flex-col xs:flex-row xs:gap-3 xs:items-center">
            <div className="w-[50px] h-[50px] xs:w-[70px] xs:h-[70px] overflow-hidden">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={user?.companyName ?? 'Event Logo'}
                  width={70}
                  height={70}
                  className="object-contain rounded-2 w-full h-full"
                />
              ) : (
                <ImagePlaceholder className="w-[70px] h-[70px]" label="Logo" />
              )}
            </div>
            <div className="flex flex-col text-background gap-2 max-w-[350px]">
              <h3 className="text-sm font-semibold line-clamp-1 hidden xs:block">
                {user?.companyName}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
