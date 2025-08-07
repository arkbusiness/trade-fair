'use client';

import { usePathname } from 'next/navigation';
import { useUser } from '../../hooks/api';
import { getFullname } from '../../utils';
import { AvatarMenu } from './avatar-menu';
import Link from 'next/link';
import Image from 'next/image';
import { ORGANIZER_APP_ROUTES } from '../../constants';

const DASHBOARD_TITLES = {
  '/admin-users': 'Admin Users',
  '/customer-users': 'Customer Users',
  '/subscription-plans': 'Subscription Plans',
  '/user-plan-management': 'User Plan Management'
};

const getTitle = (pathname: string) => {
  let title = 'Dashboard';

  for (const key of Object.keys(DASHBOARD_TITLES) as Array<
    keyof typeof DASHBOARD_TITLES
  >) {
    const startWithSlash = key.startsWith('/');

    if (pathname.includes(key) && startWithSlash) {
      title = DASHBOARD_TITLES[key];
    } else if (pathname.includes(key) && !startWithSlash) {
      title = DASHBOARD_TITLES[key];
    }
  }

  return title;
};

export enum GlobalHeaderModalType {
  NONE,
  CONTACT_US
}

export const GlobalHeader = () => {
  const { user } = useUser();

  const pathname = usePathname();
  const title = getTitle(pathname);

  const { firstName, lastName } = user ?? {};

  const fullName = getFullname({
    firstName: firstName ?? '',
    lastName: lastName ?? ''
  });

  return (
    <header className="flex flex-col h-[var(--organizer-header-height)] fixed top-0 w-full z-20">
      <div className='h-[3.75rem] flex items-center bg-gold/100 px-[1.13rem] '>
        <Link href={ORGANIZER_APP_ROUTES.root()}>
          <Image
            src="/images/logo-light.svg"
            alt="ARK Logo"
            width={80}
            height={21}
            className="object-contain w-[5rem] sm:w-[5rem]"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center py-[1rem] px-[1.13rem]  gap-x-2 w-full relative bg-highlight h-[5.5rem]">
        <p className="text-[0.9rem] font-semibold">{title}</p>
        <div className="flex items-center gap-x-2">
          <AvatarMenu name={fullName} />
        </div>
      </div>
    </header>
  );
};
