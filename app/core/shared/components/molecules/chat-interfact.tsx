'use client';

import { ChatHeader } from '../atoms';

interface ChatInterfaceProps {
  contactName: string;
  contactAvatar?: string;
  children: React.ReactNode;
}

export const ChatInterface = ({
  contactName,
  contactAvatar,
  children
}: ChatInterfaceProps) => {
  return (
    <div className="flex flex-col h-full bg-white relative">
      <ChatHeader contactName={contactName} contactAvatar={contactAvatar} />
      {children}
    </div>
  );
};
