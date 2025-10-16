import {
  Backpack,
  BoxIcon,
  Calendar,
  CalendarIcon,
  House,
  MessageCircleMore,
  ReceiptText,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingBasket
} from 'lucide-react';
import { AltUserIcon, BoothIcon } from '../icons';
import {
  ATTENDEE_APP_ROUTES,
  EXHIBITOR_APP_ROUTES,
  ORGANIZER_APP_ROUTES
} from './common.const';

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

export const EXHIBITOR_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    url: EXHIBITOR_APP_ROUTES.root(),
    icon: House,
    routes: []
  },
  {
    title: 'My Products',
    url: undefined,
    icon: undefined,
    routes: [
      {
        title: 'Inventory',
        icon: BoxIcon,
        url: EXHIBITOR_APP_ROUTES.inventory.root()
      },
      {
        title: 'Orders & Invoice',
        icon: ShoppingBagIcon,
        url: EXHIBITOR_APP_ROUTES.inventory.orders.root()
      }
    ]
  },
  {
    title: 'Attendees',
    url: undefined,
    icon: undefined,
    routes: [
      {
        icon: CalendarIcon,
        title: 'Appointments',
        url: EXHIBITOR_APP_ROUTES.attendees.appointment.root()
      },
      {
        icon: MessageCircleMore,
        title: 'Messaging',
        url: EXHIBITOR_APP_ROUTES.attendees.messaging.root()
      }
    ]
  }
];

export const ATTENDEE_SIDEBAR_ITEMS = [
  {
    title: 'Home',
    url: ATTENDEE_APP_ROUTES.root(),
    icon: House,
    routes: []
  },
  {
    title: 'Product Hub',
    url: undefined,
    icon: undefined,
    routes: [
      {
        title: 'Catalogues',
        icon: ShoppingBasket,
        url: ''
      },
      {
        title: 'Orders & Invoice',
        icon: ReceiptText,
        url: ATTENDEE_APP_ROUTES.orders.root()
      }
    ]
  },
  {
    title: 'Networking',
    url: undefined,
    icon: undefined,
    routes: [
      {
        title: 'Exhibitors',
        icon: Backpack,
        url: ''
      },
      {
        title: 'Messaging',
        icon: MessageCircleMore,
        url: ''
      },
      {
        title: 'Appointments',
        icon: Calendar,
        url: ATTENDEE_APP_ROUTES.meetings.root()
      }
    ]
  }
];
