'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { useSetParams } from '@/app/core/shared/hooks';
import { useExhibitorUser } from '@/app/core/shared/hooks/api/use-exhibitor-user';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAttendeeMessages } from '../../hooks/use-messages';
import { ChatMessageBubble } from '../atoms';

export const ChatMessagesList = () => {
  const { searchParamsObject } = useSetParams();
  const { user } = useExhibitorUser();

  const attendeeId = searchParamsObject?.['attendeeId'] ?? '';

  const {
    messages,
    attendee,
    handleFetchNextPage,
    handleFetchPreviousPage,
    isLoading
  } = useAttendeeMessages(attendeeId);
  const { ref: endRef, inView: endInView } = useInView();
  const { ref: startRef, inView: startInView } = useInView();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (endInView) {
      console.log({ end: 'Ending' });
      handleFetchNextPage();
    }
  }, [endInView, handleFetchNextPage]);

  useEffect(() => {
    if (startInView) {
      console.log({ start: 'Starting' });
      handleFetchPreviousPage();
    }
  }, [startInView, handleFetchPreviousPage]);

  if (!isLoading && messages?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="text-center">
          <div className="mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto text-gray-400"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No messages yet</p>
          <p className="text-gray-400 text-xs mt-1">Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 relative">
      <div ref={startRef} />
      {isLoading && (
        <div className="flex items-center justify-center h-full absolute top-0 left-0 w-full bg-white/70">
          <Spinner />
        </div>
      )}
      <div className="space-y-1">
        {messages?.map((msg) => {
          const isOwn = msg.senderId === user?.id;

          return (
            <ChatMessageBubble
              key={msg.id}
              message={msg.content}
              timestamp={msg.createdAt}
              isOwn={isOwn}
              attendeeName={!isOwn ? attendee?.name : undefined}
              ownerAvatar={user?.logoUrl ?? ''}
              attendeeAvatar={attendee?.avatar}
            />
          );
        })}
      </div>

      <div ref={messagesEndRef} />
      <div ref={endRef} />
    </div>
  );
};
