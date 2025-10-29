'use client';

import { NoMessage } from '@/app/core/shared/components/atoms';
import { ChatInterface } from '@/app/core/shared/components/molecules/chat-interfact';
import { useMessageSlice } from '@/app/core/shared/slice';
import { AlignLeft } from 'lucide-react';
import { useAttendeeChatMessages } from '../../api/get-attendee-chat-messages';
import { AttendeeChatInput } from '../atoms';
import { AttendeeConversations } from '../molecules';

export const AttendeeChatMain = () => {
  const { selectedUserId, onOpenDrawer } = useMessageSlice();

  const { exhibitor } = useAttendeeChatMessages({
    exhibitorId: selectedUserId
  });

  const hasSelectedChat = !!selectedUserId;

  return (
    <div className="flex h-full flex-col overflow-hidden border bg-white lg:w-3/4 relative">
      <button
        onClick={() => onOpenDrawer()}
        className="cursor-pointer lg:hidden absolute top-4 left-4"
      >
        <AlignLeft size={24} />
      </button>

      {hasSelectedChat ? (
        <ChatInterface
          contactName={exhibitor?.name ?? ''}
          contactAvatar={exhibitor?.avatar}
        >
          <AttendeeConversations />
          <AttendeeChatInput />
        </ChatInterface>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <NoMessage />
        </div>
      )}
    </div>
  );
};
