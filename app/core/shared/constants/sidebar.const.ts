import { House, SettingsIcon } from 'lucide-react';
import { AltUserIcon, BoothIcon } from '../icons';
import { ORGANIZER_APP_ROUTES } from './common.const';

export const ORGANIZER_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    url: ORGANIZER_APP_ROUTES.root(),
    icon: House,
    routes: []
  },
  {
    title: 'Exhibitor',
    url: undefined,
    icon: BoothIcon,
    routes: [
      {
        title: 'Manage booths',
        url: ORGANIZER_APP_ROUTES.exhibitors.booths.root()
      },
      {
        title: 'Exhibitors',
        url: ORGANIZER_APP_ROUTES.exhibitors.root()
      }
    ]
  },
  {
    title: 'Attendees',
    url: ORGANIZER_APP_ROUTES.attendees.root(),
    icon: AltUserIcon,
    routes: []
  },
  {
    title: 'Settings',
    url: ORGANIZER_APP_ROUTES.settings(),
    icon: SettingsIcon,
    routes: []
  }
];
