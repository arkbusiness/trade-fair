'use client';

import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import { useSetParams } from '@/app/core/shared/hooks';
import { AlignLeft } from 'lucide-react';
import Image from 'next/image';

interface ChatHeaderProps {
  contactName: string;
  contactAvatar?: string;
}

export const ChatHeader = ({ contactName, contactAvatar }: ChatHeaderProps) => {
  const { setParam } = useSetParams();
  const hasImage = !!contactAvatar;

  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setParam('chat-drawer', '1')}
          className="cursor-pointer lg:hidden"
        >
          <AlignLeft size={24} />
        </button>
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
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{contactName}</h3>
        </div>
      </div>
    </div>
  );
};
