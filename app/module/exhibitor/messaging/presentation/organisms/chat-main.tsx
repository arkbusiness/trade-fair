'use client';

import { useState } from 'react';
import { NoMessage } from '../atoms';
import { ChatInterface } from '../molecules';

export const ChatMain = () => {
  const [selectedChat] = useState<{
    contactName: string;
    contactAvatar?: string;
    contactId: string;
    isOnline?: boolean;
    lastSeen?: string;
  } | null>({
    contactName: 'Ade Johnson',
    contactAvatar: 'https://avatar.iran.liara.run/public/13',
    contactId: 'contact-1',
    isOnline: true,
    lastSeen: undefined
  });

  const currentUserId = 'current-user';

  return (
    <div className="flex h-full flex-col overflow-hidden border bg-white xl:w-3/4">
      {selectedChat ? (
        <ChatInterface
          contactName={selectedChat.contactName}
          contactAvatar={selectedChat.contactAvatar}
          contactId={selectedChat.contactId}
          currentUserId={currentUserId}
          isOnline={selectedChat.isOnline}
          lastSeen={selectedChat.lastSeen}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <NoMessage />
        </div>
      )}
    </div>
  );
};
