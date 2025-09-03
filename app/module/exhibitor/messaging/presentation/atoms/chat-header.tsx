'use client';

import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import Image from 'next/image';

interface ChatHeaderProps {
  contactName: string;
  contactAvatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export const ChatHeader = ({
  contactName,
  contactAvatar,
  isOnline = false,
  lastSeen
}: ChatHeaderProps) => {
  const hasImage = !!contactAvatar;

  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          {hasImage ? (
            <div className="h-10 w-10 rounded-full">
              <Image
                src={contactAvatar}
                alt={contactName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full">
              <ImagePlaceholder
                label="No Image"
                className="w-full h-full text-[10px] rounded-full"
              />
            </div>
          )}
          {isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{contactName}</h3>
          <p className="text-xs text-gray-500">
            {isOnline
              ? 'Online'
              : lastSeen
                ? `Last seen ${lastSeen}`
                : 'Offline'}
          </p>
        </div>
      </div>
    </div>
  );
};
