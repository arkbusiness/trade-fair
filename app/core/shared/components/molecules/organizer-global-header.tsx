'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ORGANIZER_APP_ROUTES } from '../../constants';
import { useOrganizerUser } from '../../hooks/api';
import { formatDate } from '../../lib';
import { AvatarMenu } from './avatar-menu';
import { useSidebar } from '../atoms';
import { AlignLeft } from 'lucide-react';
import { useOrganizerAuthStore } from '@/app/module/auth/store';
import { OrganizerSettingsPage } from '../../types';

export enum GlobalHeaderModalType {
  NONE,
  CONTACT_US
}

export const OrganizerGlobalHeader = () => {
  const { toggleSidebar } = useSidebar();
  const { handleLogOut } = useOrganizerAuthStore();
  const { user } = useOrganizerUser();
  const { eventLogoUrl, logo } = user ?? {
    eventLogoUrl: null
  };

  return (
    <header className="flex flex-col h-[var(--header-height)] fixed top-0 w-full z-20">
      <div className="h-[3.75rem] flex items-center bg-gold/100 px-[1.13rem] ">
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
      <div className="flex justify-between items-center py-[1rem] px-[1.13rem]  gap-x-4 w-full relative h-[5.5rem] bg-[linear-gradient(90deg,_var(--light-blue)_0%,_var(--dark-blue)_100%)]">
        <div className="flex gap-3 ">
          <button
            onClick={toggleSidebar}
            className="text-background cursor-pointer"
          >
            <AlignLeft size={24} />
          </button>
          <div className="flex flex-col xs:flex-row xs:gap-3 xs:items-center">
            <div className="w-[50px] h-[50px] xs:w-[80px] xs:h-[80px] overflow-hidden">
              <Image
                src={
                  eventLogoUrl ??
                  'https://placehold.co/600x400/png?text=Event+Logo'
                }
                alt={user?.eventName ?? 'Event Logo'}
                width={80}
                height={80}
                className="object-contain rounded-2 w-full h-full"
              />
            </div>
            <div className="flex flex-col text-background gap-2 max-w-[350px]">
              <h3 className="text-sm font-semibold line-clamp-1 hidden xs:block">
                {user?.companyName}
              </h3>
              <h4 className="text-xs font-medium hidden sm:block">{`${user?.eventStartDate ? formatDate(user.eventStartDate) : ''} ${user?.eventEndDate ? ` - ${formatDate(user.eventEndDate)}` : ''}`}</h4>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <AvatarMenu
            userName={user?.username ?? ''}
            handleLogout={handleLogOut}
            logo={logo ?? undefined}
            profilePageHref={ORGANIZER_APP_ROUTES.settings(
              OrganizerSettingsPage.PROFILE
            )}
            passwordPageHref={ORGANIZER_APP_ROUTES.settings(
              OrganizerSettingsPage.CHANGE_PASSWORD
            )}
          />
        </div>
      </div>
    </header>
  );
};
