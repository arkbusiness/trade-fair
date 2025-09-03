'use client';

import { cn } from '@/app/core/shared/utils';
import { distanceFormat } from '@/app/core/shared/lib';

interface ChatMessageBubbleProps {
  message: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
}

export const ChatMessageBubble = ({
  message,
  timestamp,
  isOwn,
  senderName
}: ChatMessageBubbleProps) => {
  return (
    <div
      className={cn('flex w-full mb-4', {
        'justify-end': isOwn,
        'justify-start': !isOwn
      })}
    >
      <div
        className={cn('max-w-xs lg:max-w-md px-4 py-2 rounded-lg', {
          'bg-tertiary text-white': isOwn,
          'bg-gray-100 text-gray-900': !isOwn
        })}
      >
        {!isOwn && senderName && (
          <p className="text-xs font-medium text-gray-600 mb-1">{senderName}</p>
        )}
        <p className="text-sm">{message}</p>
        <p
          className={cn('text-xs mt-1', {
            'text-white/70': isOwn,
            'text-gray-500': !isOwn
          })}
        >
          {distanceFormat(timestamp)}
        </p>
      </div>
    </div>
  );
};
