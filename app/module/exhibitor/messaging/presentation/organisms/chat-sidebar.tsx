'use client';

import { ChatTabs } from '@/app/core/shared/components/molecules';
import { ExhibitorChatPreview } from '../molecules';

export const ChatSidebar = () => {
  return (
    <div className="flex-col overflow-hidden border border-gray-200 bg-white hidden  lg:flex lg:w-[20rem]">
      {/* Search */}
      {/* <ChatSearch handleSearch={(value) => console.log(value)} /> */}

      {/* Tabs */}
      <ChatTabs />

      {/* Preview */}
      <ExhibitorChatPreview />
    </div>
  );
};
