import {
  COOKIE_KEYS,
  COOKIE_OPTIONS
} from '@/app/core/shared/constants/common.const';
import { getQueryClient } from '@/app/core/shared/lib';
import { isDev } from '@/app/core/shared/utils';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

export interface IExhibitorAuthUser {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  logoUrl: string | null;
  boothNumber: string;
  boothName: string | null;
  standNumber: string | null;
  publicDescription: string | null;
  websiteUrl: string | null;
  createdAt: string;
  updatedAt: string;
  password: string;
  fcmToken: string | null;
  deactivated: boolean;
  country: string | null;
  currency: string | null;
  organizeId: string | null;
  invitedId: string;
  PaymentDetails:
    | {
        bankName: string;
        bankAccountName: string;
        bankAccountNumber: string;
      }[]
    | null;
}
interface AuthState {
  accessToken: string;
  tempAccessToken: string;
  inviteToken: string;
  hasCheckedToken: boolean;
  userId: string;
  handleSaveToken({ accessToken }: { accessToken?: string }): void;
  handleSaveTempToken({ accessToken }: { accessToken?: string }): void;
  handleSaveUserId({ userId }: { userId?: string }): void;
  handleLoadToken(): void;
  handleLogOut(): void;
  handleRemoveToken(key: string): void;
}

const INITIAL_STATE = {
  accessToken: '',
  tempAccessToken: '',
  inviteToken: '',
  userId: ''
};

export const useExhibitorAuthStore = create<AuthState>()((set, get) => ({
  ...INITIAL_STATE,
  hasCheckedToken: false,
  handleLoadToken: async () => {
    try {
      const accessToken = (await getCookie(COOKIE_KEYS.auth.token)) || '';

      if (!accessToken) {
        get().handleLogOut();
        return;
      }

      if (accessToken) {
        get().handleSaveToken({ accessToken });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      get().handleLogOut();
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
  },
  handleSaveTempToken({ accessToken }) {
    if (accessToken) {
      set({
        tempAccessToken: accessToken
      });
    }
  },
  handleSaveUserId({ userId }) {
    if (userId) {
      set({
        userId: userId
      });
    }
  }
}));
