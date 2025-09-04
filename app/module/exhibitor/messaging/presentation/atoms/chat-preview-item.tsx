'use client';

import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import { useSetParams } from '@/app/core/shared/hooks';
import { cn } from '@/app/core/shared/utils';
import Image from 'next/image';

interface ChatPreviewItemProps {
  id: string;
  avatar: string;
  name: string;
  message: string;
  // date: string;
  handleSelect: () => void;
}

export const ChatPreviewItem = ({
  id,
  avatar,
  name,
  message,
  // date,
  handleSelect
}: ChatPreviewItemProps) => {
  const { searchParamsObject } = useSetParams();

  const attendeeId = searchParamsObject?.['attendeeId'] ?? '';

  const hasImage = !!avatar;

  return (
    <div
      className={cn(
        'py-5 px-2 rounded-[8px] flex gap-2 items-center hover:bg-highlight cursor-pointer',
        {
          'bg-highlight': id === attendeeId
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
            {/* <p className="text-[10px] font-normal text-foreground  w-24 text-right">
              {distanceFormat(date)}
            </p> */}
          </div>
          <p className="text-[10px] font-normal line-clamp-1">{message}</p>
        </div>

        {/* <div
          className={cn(
            'w-5 h-5 rounded-full bg-tertiary text-background flex items-center justify-center text-xs'
          )}
        >
          <span>5</span>
        </div> */}
      </div>
    </div>
  );
};
