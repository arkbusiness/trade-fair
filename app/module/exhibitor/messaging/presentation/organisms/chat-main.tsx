'use client';

import { NoMessage } from '@/app/core/shared/components/atoms';
import { ChatInterface } from '@/app/core/shared/components/molecules/chat-interfact';
import { useMessageSlice } from '@/app/core/shared/slice';
import { AlignLeft } from 'lucide-react';
import { useExhibitorChatMessages } from '../../api';
import { ExhibitorChatInput } from '../atoms';
import { ExhibitorConversations } from '../molecules';

export const ChatMain = () => {
  const { selectedUserId, onOpenDrawer } = useMessageSlice();

  const { attendee } = useExhibitorChatMessages({ attendeeId: selectedUserId });

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
          contactName={attendee?.name ?? ''}
          contactAvatar={attendee?.avatar}
        >
          <ExhibitorConversations />
          <ExhibitorChatInput />
        </ChatInterface>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <NoMessage />
        </div>
      )}
    </div>
  );
};
