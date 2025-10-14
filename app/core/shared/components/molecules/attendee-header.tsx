'use client';

import { useAttendeeAuthStore } from '@/app/module/auth/store';
import { usePathname } from 'next/navigation';
import { ATTENDEE_APP_ROUTES } from '../../constants';
import { useAttendeeUser } from '../../hooks/api';
import { AvatarMenu } from './avatar-menu';
import { useSidebar } from '../atoms';
import { AlignLeft } from 'lucide-react';

const DASHBOARD_TITLES = {
  '/catalogues': 'Catalogues',
  '/orders': 'Orders & Invoice',
  '/exhibitors': 'Exhibitors',
  '/appointments': 'Appointments',
  '/messaging': 'Messaging',
  '/settings': 'Settings'
};

const getTitle = (pathname: string) => {
  let title = 'Home';

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

export const AttendeeHeader = () => {
  const { toggleSidebar } = useSidebar();
  const { handleLogOut } = useAttendeeAuthStore();
  const { user } = useAttendeeUser();
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="flex justify-between items-center py-[1rem] gap-x-2 w-full relative border-b px-6">
      <div className="flex items-center gap-x-2">
        <button
          onClick={toggleSidebar}
          className="text-foreground cursor-pointer"
        >
          <AlignLeft size={24} />
        </button>
        <p className="sm:text-lg font-semibold text-foreground ml-1">{title}</p>
      </div>
      <div className="flex items-center gap-x-1">
        <AvatarMenu
          className="border-none"
          userName={user?.contactName ?? ''}
          handleLogout={handleLogOut}
          profilePageHref={ATTENDEE_APP_ROUTES.settings()}
          passwordPageHref={ATTENDEE_APP_ROUTES.settings()}
          logo={user?.logoUrl ?? undefined}
        />
      </div>
    </header>
  );
};
