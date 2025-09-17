import {
  COOKIE_KEYS,
  COOKIE_OPTIONS
} from '@/app/core/shared/constants/common.const';
import { getQueryClient } from '@/app/core/shared/lib';
import { isDev } from '@/app/core/shared/utils';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

export interface IOrganizerAuthUser {
  id: string;
  companyName: string;
  contactName: string;
  contactPhone: string;
  username: string;
  officialEmail: string;
  createdAt: string;
  updatedAt: string;
  country: string;
  timeZone: null | string;
  logo: string | null;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  venueName: string;
  eventLogoUrl: null | string;
  eventTimeZone: string | null;
  invitedId: string | null;
}
interface IAuthState {
  accessToken: string;
  inviteToken: string;
  hasCheckedToken: boolean;
  handleSaveToken({ accessToken }: { accessToken?: string }): void;
  handleLoadToken(): void;
  handleLogOut(): void;
  handleRemoveToken(key: string): void;
}

const INITIAL_STATE = {
  accessToken: '',
  inviteToken: ''
};

export const useOrganizerAuthStore = create<IAuthState>()((set) => ({
  ...INITIAL_STATE,
  hasCheckedToken: false,
  handleLoadToken: async () => {
    try {
      const accessToken = (await getCookie(COOKIE_KEYS.auth.token)) || '';

      if (!accessToken) {
        useOrganizerAuthStore.getState().handleLogOut();
        return;
      }

      if (accessToken) {
        useOrganizerAuthStore.getState().handleSaveToken({ accessToken });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      useOrganizerAuthStore.getState().handleLogOut();
    } finally {
      set((state) => ({
        ...state,
        hasCheckedToken: true
      }));
    }
  },
  handleLogOut: async () => {
    await deleteCookie(COOKIE_KEYS.auth.token);
    getQueryClient().resetQueries();
    getQueryClient().clear();
    set((state) => ({
      ...state,
      ...INITIAL_STATE
    }));
    window.location.href = '/';
  },
  handleRemoveToken: async (key: string) => {
    if (!key) return;
    await deleteCookie(key);
  },
  handleSaveToken({ accessToken }) {
    const options = isDev() ? COOKIE_OPTIONS.dev(4) : COOKIE_OPTIONS.prod(24);

    if (accessToken) {
      setCookie(COOKIE_KEYS.auth.token, accessToken, options);

      set((state) => {
        return {
          accessToken: accessToken ?? state.accessToken
        };
      });
    }
  }
}));
