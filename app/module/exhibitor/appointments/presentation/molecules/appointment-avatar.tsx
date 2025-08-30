'use client';

import Image from 'next/image';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import { IAttendee } from '@/app/module/organizer/attendees/hooks';

interface AppointmentAvatarProps {
  attendee?: IAttendee;
}

export const AppointmentAvatar = ({ attendee }: AppointmentAvatarProps) => {
  const hasImage = !!attendee?.logoUrl;

  return (
    <div className="w-12 h-12">
      {hasImage && (
        <Image
          src={attendee.logoUrl}
          alt={attendee.contactName}
          width={48}
          height={48}
          className="rounded-full object-contain h-full w-full"
        />
      )}
      {!hasImage && (
        <ImagePlaceholder
          label="No Image"
          className="w-full h-full  rounded-full text-xs"
        />
      )}
    </div>
  );
};
