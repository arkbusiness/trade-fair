'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { ChatPreview, ChatSearch, ChatTabs } from '../molecules';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/app/core/shared/components/atoms/drawer';

export const ChatDrawer = () => {
  const { searchParamsObject, removeQueryParam } = useSetParams();
  const isOpen = !!searchParamsObject?.['chat-drawer'];

  const handleClose = () => {
    removeQueryParam('chat-drawer');
  };

  return (
    <Drawer direction="left" open={isOpen} onClose={handleClose}>
      <DrawerContent className="left-0 h-screen w-[50%] lg:w-[40%] xl:w-[30%] rounded-none right-auto p-0 m-0">
        <DrawerHeader>
          <DrawerTitle>Chat</DrawerTitle>
          <div className="flex-col overflow-hidden border border-gray-200 bg-white">
            {/* Search */}
            <ChatSearch handleSearch={(value) => console.log(value)} />

            {/* Tabs */}
            <ChatTabs />

            {/* Preview */}
            <ChatPreview />
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
