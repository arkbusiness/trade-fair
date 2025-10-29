'use client';

import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import { cn } from '@/app/core/shared/utils';
import Image from 'next/image';

interface ChatPreviewItemProps {
  id: string;
  avatar: string;
  name: string;
  message: string;
  selectedUserId: string;
  handleSelect: () => void;
}

export const ChatPreviewItem = ({
  id,
  avatar,
  name,
  message,
  selectedUserId,
  handleSelect
}: ChatPreviewItemProps) => {
  const hasImage = !!avatar;

  return (
    <div
      className={cn(
        'py-5 px-2 rounded-[8px] flex gap-2 items-center hover:bg-highlight cursor-pointer',
        {
          'bg-highlight': id === selectedUserId
        }
      )}
      onClick={handleSelect}
    >
      <div>
        {hasImage && (
          <div className="h-10 w-10 rounded-full">
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
        )}
        {!hasImage && (
          <div className="h-10 w-10 rounded-full">
            <ImagePlaceholder
              label="No Image"
              className="w-full h-full text-[10px] rounded-full"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col justify-between gap-1 flex-1">
          <div className="flex gap-2 justify-between items-center">
            <p className="text-sm font-medium text-foreground line-clamp-1 flex-1 ">
              {name}
            </p>
          </div>
          <p className="text-[10px] font-normal line-clamp-1">{message}</p>
        </div>
      </div>
    </div>
  );
};
