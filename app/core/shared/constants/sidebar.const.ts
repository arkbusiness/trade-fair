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
        title: 'Booth categories',
        url: ORGANIZER_APP_ROUTES.exhibitors.booths.categories.root()
      },
      {
        title: 'Manage booths',
        url: ORGANIZER_APP_ROUTES.exhibitors.booths.root()
      },
      {
        title: 'exhibitors',
        url: ORGANIZER_APP_ROUTES.exhibitors.root()
      }
    ]
  },
  {
    title: 'Attendees',
    url: undefined,
    icon: AltUserIcon,
    routes: [
      {
        title: 'Manage attendees',
        url: ORGANIZER_APP_ROUTES.attendees.root()
      },
      {
        title: 'Attendees overview',
        url: ORGANIZER_APP_ROUTES.attendees.overview()
      }
    ]
  },
  {
    title: 'Settings',
    url: ORGANIZER_APP_ROUTES.settings(),
    icon: SettingsIcon,
    routes: []
  },
];
