import { create } from 'zustand';

export enum CHAT_TAB {
  ALL = 'all',
  UNREAD = 'unread'
}

interface MessageSlice {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
  tab: CHAT_TAB;
  setTab: (tab: CHAT_TAB) => void;
  selectedUserId: string;
  setSelectedUserId: (id: string) => void;
}

export const useMessageSlice = create<MessageSlice>((set) => ({
  isOpenDrawer: false,
  onCloseDrawer: () => set({ isOpenDrawer: false }),
  onOpenDrawer: () => set({ isOpenDrawer: true }),
  tab: CHAT_TAB.ALL,
  setTab: (tab: CHAT_TAB) => set({ tab }),
  selectedUserId: '',
  setSelectedUserId: (id: string) => set({ selectedUserId: id })
}));
