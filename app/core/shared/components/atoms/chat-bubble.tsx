'use client';

import { cn } from '@/app/core/shared/utils';
import { distanceFormat } from '@/app/core/shared/lib';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import Image from 'next/image';

interface ChatBubbleProps {
  ownerAvatar?: string;
  selectedUserAvatar?: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
  selectedUserName?: string;
}

export const ChatBubble = ({
  message,
  timestamp,
  isOwn,
  selectedUserName,
  ownerAvatar,
  selectedUserAvatar
}: ChatBubbleProps) => {
  const hasOwnerImage = !!ownerAvatar;
  const hasSelectedUserImage = !!selectedUserAvatar;

  return (
    <div
      className={cn('flex w-full mb-4', {
        'justify-end': isOwn,
        'justify-start': !isOwn
      })}
    >
      {!isOwn && (
        <div className="w-8 h-8 rounded-full mr-3">
          {hasSelectedUserImage ? (
            <Image
              src={selectedUserAvatar}
              alt="Selected User Avatar"
              width={32}
              height={32}
              className="w-full h-full rounded-full"
            />
          ) : (
            <ImagePlaceholder
              className="w-full h-full rounded-full text-xs"
              label={selectedUserName?.slice(0, 2) || 'User'}
            />
          )}
        </div>
      )}
      <div
        className={cn('max-w-xs lg:max-w-md px-4 py-2 rounded-lg', {
          'bg-tertiary text-white': isOwn,
          'bg-gray-100 text-gray-900': !isOwn
        })}
      >
        {!isOwn && selectedUserName && (
          <p className="text-xs font-medium text-gray-600 mb-1">
            {selectedUserName}
          </p>
        )}
        <p className="text-sm px-2 whitespace-normal break-words">{message}</p>
        <p
          className={cn('text-xs mt-1', {
            'text-white/70': isOwn,
            'text-gray-500': !isOwn
          })}
        >
          {distanceFormat(timestamp)}
        </p>
      </div>

      {isOwn && (
        <div className="w-8 h-8 rounded-full ml-3">
          {hasOwnerImage ? (
            <Image
              src={ownerAvatar}
              alt="Owner Avatar"
              width={32}
              height={32}
              className="w-full h-full rounded-full object-contain"
            />
          ) : (
            <ImagePlaceholder
              className="w-full h-full rounded-full text-xs"
              label="You"
            />
          )}
        </div>
      )}
    </div>
  );
};
