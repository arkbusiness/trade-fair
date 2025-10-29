'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { ChatPreviewItem } from '@/app/core/shared/components/molecules';
import { CHAT_TAB, useMessageSlice } from '@/app/core/shared/slice';
import { cn } from '@/app/core/shared/utils';
import { useExhibitorChatHistory } from '../../api';

const MAX_CHAT_PREVIEW = 6;

export const ExhibitorChatPreview = () => {
  const { tab, setSelectedUserId, selectedUserId, setTab } = useMessageSlice();

  const { data, isFetching } = useExhibitorChatHistory({
    unread: tab === CHAT_TAB.UNREAD ? 'true' : ''
  });

  const isChatPreviewOverflow = (data?.length || 0) > MAX_CHAT_PREVIEW;

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
      {isFetching && (
        <div className="flex items-center justify-center h-40 absolute top-0 left-0 w-full bg-white/70">
          <Spinner />
        </div>
      )}
      {data?.map((chatPreview) => {
        const lastMessage = chatPreview?.messages
          ?.filter((msg) => msg.receiverType === 'ATTENDEE')
          .pop();

        return (
          <ChatPreviewItem
            key={chatPreview.attendeeId}
            id={chatPreview.attendeeId}
            avatar={chatPreview?.attendeeLogoUrl ?? ''}
            name={chatPreview.attendeeName}
            message={lastMessage?.content ?? ''}
            selectedUserId={selectedUserId || ''}
            // date={chatPreview.messages[0].createdAt}
            handleSelect={() => handleSelect(chatPreview.attendeeId)}
          />
        );
      })}
    </div>
  );
};
