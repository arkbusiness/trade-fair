'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { CHAT_TAB, useMessageSlice } from '@/app/core/shared/slice';
import { cn } from '@/app/core/shared/utils';
import { useAttendeeChatHistory } from '../../api';
import { ChatPreviewItem } from '@/app/core/shared/components/molecules';

const MAX_CHAT_PREVIEW = 10;

export const AttendeeChatPreview = () => {
  const { tab, setSelectedUserId, setTab, selectedUserId } = useMessageSlice();

  const { chatsData, isLoadingMessages } = useAttendeeChatHistory({
    unread: tab === CHAT_TAB.UNREAD ? 'true' : ''
  });

  const isChatPreviewOverflow = (chatsData?.length || 0) > MAX_CHAT_PREVIEW;

  const handleSelect = (attendeeId: string) => {
    setTab(CHAT_TAB.ALL);
    setSelectedUserId(attendeeId);
  };

  return (
    <div
      className={cn('flex flex-col gap-1 px-3 py-2 relative', {
        'overflow-y-auto py-3': isChatPreviewOverflow
      })}
    >
      <>
        {isLoadingMessages && (
          <div className="flex items-center justify-center h-40 absolute top-0 left-0 w-full bg-white/70">
            <Spinner />
          </div>
        )}

        {chatsData?.map((chatPreview) => {
          const lastMessage = chatPreview?.messages
            ?.filter((msg) => msg.senderType === 'EXHIBITOR')
            .pop();

          return (
            <ChatPreviewItem
              key={chatPreview.exhibitorId}
              id={chatPreview.exhibitorId}
              avatar={chatPreview?.exhibitorLogoUrl ?? ''}
              name={chatPreview.exhibitorName}
              message={lastMessage?.content ?? ''}
              selectedUserId={selectedUserId}
              // date={chatPreview.messages[0].createdAt}
              handleSelect={() => handleSelect(chatPreview.exhibitorId)}
            />
          );
        })}
      </>
    </div>
  );
};
