'use client';

import { ChatMain, ChatSidebar } from '../organisms';
import { ChatDrawer } from '../organisms/chat-drawer';

export const MessagingPage = () => {
  return (
    <>
      <ChatDrawer />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-5 h-[calc(100dvh-15.75rem)]">
        <ChatSidebar />
        <ChatMain />
      </div>
    </>
  );
};
