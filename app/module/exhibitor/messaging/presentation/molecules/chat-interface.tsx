'use client';

import { ChatHeader, ChatInput } from '../atoms';
import { ChatMessagesList } from './chat-messages-list';

interface ChatInterfaceProps {
  contactName: string;
  contactAvatar?: string;
}
//TODO: REMOVE THIS
export const ChatInterface = ({
  contactName,
  contactAvatar
}: ChatInterfaceProps) => {
  // const [messages, setMessages] = useState<Message[]>(mockMessages);

  // const handleSendMessage = (content: string) => {
  //   const newMessage: Message = {
  //     id: Date.now().toString(),
  //     content,
  //     timestamp: new Date().toISOString(),
  //     senderId: currentUserId,
  //     senderName: 'You',
  //     isOwn: true
  //   };

  //   setMessages((prev) => [...prev, newMessage]);

  //   // Simulate a response after a short delay
  //   setTimeout(() => {
  //     const responseMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       content: "Thanks for your message! I'll get back to you soon.",
  //       timestamp: new Date().toISOString(),
  //       senderId: contactId,
  //       senderName: contactName,
  //       isOwn: false
  //     };
  //     setMessages((prev) => [...prev, responseMessage]);
  //   }, 1000);
  // };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <ChatHeader contactName={contactName} contactAvatar={contactAvatar} />
      <ChatMessagesList />
      <ChatInput onSendMessage={() => {}} placeholder="Type a message..." />
    </div>
  );
};
