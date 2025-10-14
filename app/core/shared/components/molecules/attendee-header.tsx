'use client';

import { useAttendeeAuthStore } from '@/app/module/auth/store';
import { usePathname } from 'next/navigation';
import { ATTENDEE_APP_ROUTES } from '../../constants';
import { useAttendeeUser } from '../../hooks/api';
import { AvatarMenu } from './avatar-menu';

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
  const { handleLogOut } = useAttendeeAuthStore();
  const { user } = useAttendeeUser();
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="flex justify-between items-center py-[1rem] gap-x-2 w-full relative border-b px-6">
      <p className="sm:text-lg font-semibold text-foreground">{title}</p>
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
