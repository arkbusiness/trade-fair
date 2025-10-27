import {
  AttendeeChatDrawer,
  AttendeeChatMain,
  AttendeeChatSidebar
} from '../organisms';

export const AttendeeMessagesPage = () => {
  return (
    <>
      <AttendeeChatDrawer />
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-5 h-[calc(100dvh-15.75rem)]">
        <AttendeeChatSidebar />
        <AttendeeChatMain />
      </div>
    </>
  );
};
