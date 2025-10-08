'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { cn } from '@/app/core/shared/utils';
import { useAllMessages } from '../../hooks/use-messages';
import { ChatPreviewItem } from '../atoms';
import { CHAT_TAB } from './chat-tabs';
import { Spinner } from '@/app/core/shared/components/atoms';

const MAX_CHAT_PREVIEW = 6;

export const ChatPreview = () => {
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const type = searchParamsObject?.['chat-type'] ?? CHAT_TAB.ALL;

  const { data, isFetching } = useAllMessages({
    unread: type === CHAT_TAB.UNREAD ? 'true' : ''
  });

  const isChatPreviewOverflow = (data?.length || 0) > MAX_CHAT_PREVIEW;

  const handleSelect = (attendeeId: string) => {
    setMultipleParam({
      'chat-drawer': '',
      attendeeId: attendeeId
    });
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
            // date={chatPreview.messages[0].createdAt}
            handleSelect={() => handleSelect(chatPreview.attendeeId)}
          />
        );
      })}
    </div>
  );
};
