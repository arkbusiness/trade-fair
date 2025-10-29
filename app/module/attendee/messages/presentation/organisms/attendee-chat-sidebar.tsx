'use client';

import { ChatTabs } from '@/app/core/shared/components/molecules';
import { AttendeeChatPreview } from '../molecules/attendee-chat-preview';

export const AttendeeChatSidebar = () => {
  return (
    <div className="flex-col overflow-hidden border border-gray-200 bg-white hidden  lg:flex lg:w-[20rem]">
      {/* Tabs */}
      <ChatTabs />

      {/* Preview */}
      <AttendeeChatPreview />
    </div>
  );
};
