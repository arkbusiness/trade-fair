'use client';

import Image from 'next/image';
import { useOrganizerAttendeeById } from '../../hooks';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';

export const AttendeeDetailHero = ({ id }: { id: string }) => {
  const { attendee } = useOrganizerAttendeeById(id);
  const isChatEnabled = attendee?.chatUnlocked ?? false;
  const hasLogo = !!attendee?.logoUrl;

  return (
    <div className="relative">
      <div className="w-full h-[128px] bg-gradient-to-r from-[#F97316] to-[#DC2626] rounded-[8px] rounded-b-none" />
      <div className="flex justify-between px-5 sm:px-7 gap-x-8 flex-wrap mt-2 sm:mt-0 bg-background rounded-[8px] rounded-t-none pb-6 sm:pb-0">
        <div className="flex gap-2 flex-col sm:flex-row max-w-[363px] w-full">
          <div className="w-[100px] h-[100px] overflow-hidden rounded-[12px] sm:relative -top-6">
            {hasLogo ? (
              <Image
                src={attendee?.logoUrl as string}
                alt={attendee?.username ?? 'Attendee Logo'}
                width={100}
                height={100}
                className="object-cover  w-full h-full"
              />
            ) : (
              <ImagePlaceholder label="Logo" />
            )}
          </div>
          <div className="text-left mt-1 max-w-[250px] w-full">
            <p className="text-lg font-bold text-foreground">
              {attendee?.contactName ?? attendee?.username}
            </p>
            <p className="text-sm font-light break-all whitespace-pre-wra mt-3">
              {attendee?.email ?? 'N/A'}
            </p>
            <p className="text-sm font-light break-all whitespace-pre-wrap">
              {attendee?.phone ?? 'N/A'}
            </p>
          </div>
        </div>

        <div className="w-[133px] h-[32px] flex items-center justify-center rounded-[6px] mt-2 bg-green-100">
          <span className="text-green-600 font-semibold text-xs">
            {isChatEnabled ? 'Chat Unlocked' : 'Chat Locked'}
          </span>
        </div>
      </div>
    </div>
  );
};
