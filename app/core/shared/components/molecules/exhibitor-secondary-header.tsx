'use client';

import { usePathname } from 'next/navigation';
import { useExhibitorUser } from '../../hooks/api/use-exhibitor-user';
import { AvatarMenu } from './avatar-menu';
import { useExhibitorAuthStore } from '@/app/module/auth/store';
import { EXHIBITOR_APP_ROUTES } from '../../constants';
import { ExhibitorSettingsPageEnum } from '../../types';

const DASHBOARD_TITLES = {
  '/inventory': 'Inventory',
  '/inventory/orders': 'Orders & Invoice',
  '/invoice': 'Invoice',
  '/appointments': 'Appointments',
  '/messaging': 'Messaging',
  '/settings': 'Settings'
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

export const ExhibitorSecondaryHeader = () => {
  const { handleLogOut } = useExhibitorAuthStore();
  const { user } = useExhibitorUser();
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="flex justify-between items-center py-[1rem] gap-x-2 w-full relative border-b px-6">
      <p className="sm:text-lg font-semibold text-foreground">{title}</p>
      <div className="flex items-center gap-x-1">
        {/* Notification */}
        <button className="cursor-pointer">
          <svg
            width={32}
            height={33}
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.2681 25.6665C14.4436 25.9705 14.6961 26.223 15.0001 26.3985C15.3041 26.574 15.649 26.6664 16.0001 26.6664C16.3511 26.6664 16.696 26.574 17 26.3985C17.3041 26.223 17.5565 25.9705 17.7321 25.6665"
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.26176 19.9925C7.13112 20.1357 7.04491 20.3137 7.01361 20.505C6.98231 20.6963 7.00728 20.8926 7.08546 21.0699C7.16365 21.2473 7.29169 21.3981 7.45401 21.504C7.61633 21.6099 7.80594 21.6664 7.99976 21.6665H23.9998C24.1936 21.6666 24.3832 21.6103 24.5456 21.5046C24.708 21.3989 24.8363 21.2483 24.9146 21.071C24.993 20.8938 25.0182 20.6976 24.9872 20.5063C24.9561 20.315 24.8702 20.1368 24.7398 19.9935C23.4098 18.6225 21.9998 17.1655 21.9998 12.6665C21.9998 11.0752 21.3676 9.54908 20.2424 8.42386C19.1172 7.29864 17.5911 6.6665 15.9998 6.6665C14.4085 6.6665 12.8823 7.29864 11.7571 8.42386C10.6319 9.54908 9.99976 11.0752 9.99976 12.6665C9.99976 17.1655 8.58876 18.6225 7.26176 19.9925Z"
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <AvatarMenu
          className="border-none"
          userName={user?.contactName ?? ''}
          handleLogout={handleLogOut}
          profilePageHref={EXHIBITOR_APP_ROUTES.settings(
            ExhibitorSettingsPageEnum.MY_PROFILE
          )}
          passwordPageHref={EXHIBITOR_APP_ROUTES.settings(
            ExhibitorSettingsPageEnum.CHANGE_PASSWORD
          )}
          logo={user?.logoUrl ?? undefined}
        />
      </div>
    </header>
  );
};
