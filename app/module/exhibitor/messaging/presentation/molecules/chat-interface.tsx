'use client';

import { ChatHeader, ChatInput } from '../atoms';
import { ChatMessagesList } from './chat-messages-list';

interface ChatInterfaceProps {
  contactName: string;
  contactAvatar?: string;
}

export const ChatInterface = ({
  contactName,
  contactAvatar
}: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full bg-white relative">
      <ChatHeader contactName={contactName} contactAvatar={contactAvatar} />
      <ChatMessagesList />
      <ChatInput placeholder="Type a message..." />
    </div>
  );
};
