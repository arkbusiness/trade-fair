'use client';

import { useSetParams } from '@/app/core/shared/hooks';
import { cn } from '@/app/core/shared/utils';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAllMessages } from '../../hooks/use-messages';
import { ChatPreviewItem } from '../atoms';

const MAX_CHAT_PREVIEW = 6;

export const ChatPreview = () => {
  const { ref: endRef, inView: endInView } = useInView();
  const { data, handleFetchNextPage } = useAllMessages();
  const { setMultipleParam } = useSetParams();

  const isChatPreviewOverflow = (data?.length || 0) > MAX_CHAT_PREVIEW;

  const handleSelect = (attendeeId: string) => {
    setMultipleParam({
      'chat-drawer': '',
      attendeeId: attendeeId
    });
  };

  useEffect(() => {
    if (endInView) {
      handleFetchNextPage();
    }
  }, [endInView, handleFetchNextPage]);

  return (
    <div
      className={cn('flex flex-col gap-1 px-3 py-2', {
        'overflow-y-auto py-3': isChatPreviewOverflow
      })}
    >
      {data?.map((chatPreview) => (
        <ChatPreviewItem
          key={chatPreview.attendeeId}
          id={chatPreview.attendeeId}
          avatar={chatPreview?.attendeeLogoUrl ?? ''}
          name={chatPreview.attendeeName}
          // TODO: LOOK INTO THIS(IT should display the latest message)
          message={chatPreview.messages[0].content}
          // date={chatPreview.messages[0].createdAt}
          handleSelect={() => handleSelect(chatPreview.attendeeId)}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
};
