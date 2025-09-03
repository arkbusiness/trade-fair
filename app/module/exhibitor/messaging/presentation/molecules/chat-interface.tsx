'use client';

import { useState } from 'react';
import { ChatHeader, ChatInput } from '../atoms';
import { ChatMessagesList } from './chat-messages-list';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  isOwn: boolean;
}

interface ChatInterfaceProps {
  contactName: string;
  contactAvatar?: string;
  contactId: string;
  currentUserId: string;
  isOnline?: boolean;
  lastSeen?: string;
}

// Mock data for demonstration
const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Thanks for having the time to connect with me.',
    timestamp: new Date('2025-09-03T10:30:00Z').toISOString(),
    senderId: 'contact-1',
    senderName: 'Ade Johnson',
    isOwn: false
  },
  {
    id: '2',
    content: 'You are welcome, I hope you enjoy our products.',
    timestamp: new Date('2025-09-03T10:32:00Z').toISOString(),
    senderId: 'current-user',
    senderName: 'You',
    isOwn: true
  }
];

export const ChatInterface = ({
  contactName,
  contactAvatar,
  contactId,
  currentUserId,
  isOnline = false,
  lastSeen
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toISOString(),
      senderId: currentUserId,
      senderName: 'You',
      isOwn: true
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toISOString(),
        senderId: contactId,
        senderName: contactName,
        isOwn: false
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        contactName={contactName}
        contactAvatar={contactAvatar}
        isOnline={isOnline}
        lastSeen={lastSeen}
      />
      <ChatMessagesList messages={messages} currentUserId={currentUserId} />
      <ChatInput
        onSendMessage={handleSendMessage}
        placeholder="Type a message..."
      />
    </div>
  );
};
