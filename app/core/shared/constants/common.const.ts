

export const ORGANIZER_APP_ROUTES = {
  root: () => '/organizer',
  settings: () => '/organizer/settings',
  auth: {
    login: () => '/organizer/sign-in',
  },
  exhibitors: {
    root: () => '/organizer/exhibitors',
    booths: {
      root: () => '/organizer/exhibitors/booths',
      categories: {
        root: () => '/organizer/exhibitors/booths/categories'
      }
    }
  },
  attendees: {
    root: () => '/organizer/attendees',
    overview: () => '/organizer/attendees/overview'
  }
};

export const EXHIBITOR_APP_ROUTES = {
  root: () => '/exhibitor',
  auth: {
    login: () => '/exhibitor/sign-in',
  },
};

export const APP_NAME = 'Ark';
export const CURRENCY = 'NGN';
export const CURRENCY_SYMBOL = '₦';

export const ARK_META = {
  title: 'Gopher | All-in-One Event Platform for Trade Shows & Exhibitions',
  description:
    'Revolutionize your events with Gopher: QR check-ins, exhibitor tools, and flat-rate pricing.'
};

export const COOKIE_OPTIONS = {
  dev: (hours: number) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      sameSite: 'lax' as const,
      secure: false,
      httpOnly: false,
      expires: expiryDate
    };
  },
  prod: (hours: number) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      secure: true,
      sameSite: true,
      expires: expiryDate
    };
  }
};

export const COOKIE_KEYS = {
  auth: {
    token: 'gopher_access_token',
    inviteToken: 'gopher_invite_token'
  }
};

export const EMPTY_ARRAY = [];
