'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/app/core/shared/components/atoms/drawer';
import { ChatTabs } from '@/app/core/shared/components/molecules';
import { useMessageSlice } from '@/app/core/shared/slice';
import { AttendeeChatPreview } from '../molecules/attendee-chat-preview';

export const AttendeeChatDrawer = () => {
  const { isOpenDrawer: isMessageDrawerOpen, onCloseDrawer } =
    useMessageSlice();

  return (
    <Drawer direction="left" open={isMessageDrawerOpen} onClose={onCloseDrawer}>
      <DrawerContent className="left-0 h-screen w-[50%] lg:w-[40%] xl:w-[30%] rounded-none right-auto p-0 m-0">
        <DrawerHeader>
          <DrawerTitle>Chat</DrawerTitle>
          <div className="flex-col overflow-hidden border border-gray-200 bg-white">
            {/* Tabs */}
            <ChatTabs />

            {/* Preview */}
            <AttendeeChatPreview />
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
