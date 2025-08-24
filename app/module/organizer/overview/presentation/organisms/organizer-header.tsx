'use client';

import { useCountdown } from '@/app/core/shared/hooks';
import { PinIcon, TimeIcon } from '@/app/core/shared/icons';
import { formatDate } from '@/app/core/shared/lib';
import Image from 'next/image';
import { CountdownBox, EndedBox, LiveBox } from '../atoms';
import { OrganizerDashboardExport } from '../molecules';
import { useOrganizerUser } from '@/app/core/shared/hooks/api';
import { cn } from '@/app/core/shared/utils';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { OrganizerSettingsPage } from '@/app/core/shared/types';
import Link from 'next/link';

export const OrganizerHeader = () => {
  const { user } = useOrganizerUser();

  const startDate = user?.eventStartDate;
  const endDate = user?.eventEndDate;
  const name = user?.eventName;

  const { days, hours, minutes, seconds, isLive, isExpired } = useCountdown({
    startDate,
    endDate
  });

  const hasEventImage = user?.eventLogoUrl;

  return (
    <header className="flex flex-col gap-7 w-full">
      <div
        className={cn(
          'flex flex-col w-full items-center justify-center h-[clamp(13.13rem,_30vw,_23.13rem)] p-2 relative ',
          {
            'bg-[linear-gradient(90deg,_var(--light-blue)_0%,_var(--dark-blue)_100%)]':
              !hasEventImage
          }
        )}
      >
        {!hasEventImage && (
          <p className="text-white text-center text-lg">
            To upload an event image, go to the{' '}
            <Link
              href={ORGANIZER_APP_ROUTES.settings(OrganizerSettingsPage.EVENT)}
            >
              <span className="underline">Settings page</span>
            </Link>
            .
          </p>
        )}

        {hasEventImage && (
          <Image
            src={user?.eventLogoUrl || '/images/bg-1.webp'}
            alt="Event image"
            width={3540}
            height={1110}
            className="absolute top-0 left-0 w-full h-full max-w-full object-cover"
          />
        )}

        <div className="relative z-10  max-w-[450px] w-full mx-auto p-4 flex gap-3 items-center justify-center">
          {isLive && !isExpired && <LiveBox />}
          {!isLive && !isExpired && (
            <>
              <CountdownBox value={days} label="Days" />
              <CountdownBox value={hours} label="Hours" />
              <CountdownBox value={minutes} label="Minutes" />
              <CountdownBox value={seconds} label="Seconds" />
            </>
          )}
          {!isLive && isExpired && (
            <>
              <EndedBox />
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between w-full gap-5">
        <div className="flex flex-col gap-4.5">
          <h1 className="font-medium text-lg sm:text-3xl text-black">{name}</h1>
          <div className="flex items-center gap-1.5">
            <PinIcon size={24} />
            <p className="font-medium text-sm sm:text-base">
              {user?.venueName ?? 'N/A'}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <TimeIcon size={24} />
            <p className="font-medium text-sm sm:text-base">{`${startDate ? formatDate(startDate) : ''} ${endDate ? ` - ${formatDate(endDate)}` : ''}`}</p>
          </div>
        </div>

        {/* Export Buttons */}
        <OrganizerDashboardExport />
      </div>
    </header>
  );
};
