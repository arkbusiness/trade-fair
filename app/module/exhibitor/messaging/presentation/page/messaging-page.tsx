import { ChatMain, ChatSidebar } from '../organisms';

export const MessagingPage = () => {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:gap-5 h-[calc(100dvh-15.75rem)]">
      <ChatSidebar />
      <ChatMain />
    </div>
  );
};
