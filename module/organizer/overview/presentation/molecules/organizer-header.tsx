'use client';

import { IconButton } from '@/app/core/shared/components/molecules';
import { useCountdown } from '@/app/core/shared/hooks';
import { formatDate } from '@/app/core/shared/lib';
import { FileUp } from 'lucide-react';
import Image from 'next/image';

interface OrganizerHeaderProps {
  location: string;
  startDate: string;
  name: string;
  endDate: string;
}

// TODO: REMOVE
const targetDate = new Date('2025-11-14T16:32:00');

const CountdownBox = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="flex items-center flex-col gap-1 justify-center h-[78px] w-[64px] sm:w-[84px] rounded bg-tertiary/85 py-3 px-5 text-background">
      <strong className="font-bold text-lg sm:text-2xl">{value}</strong>
      <span className="font-medium text-xs sm:text-sm">{label}</span>
    </div>
  );
};

const LiveBox = () => {
  return (
    <div className="flex items-center flex-col gap-1 justify-center h-[78px] w-[84px] rounded bg-green-600 py-3 px-5 text-background">
      <strong className="font-bold text-2xl">LIVE</strong>
    </div>
  );
};

export const OrganizerHeader = ({
  location,
  name,
  startDate,
  endDate
}: OrganizerHeaderProps) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(
    targetDate,
    () => {
      console.log('🎉 Event has started!');
    }
  );

  return (
    <header className="flex flex-col gap-7 w-full">
      <div className="flex flex-col w-full items-center justify-center h-[clamp(13.13rem,_30vw,_23.13rem)] p-2 relative">
        <Image
          src="/images/bg-1.webp"
          alt="Event image"
          width={3540}
          height={1110}
          className="absolute top-0 left-0 w-full h-full max-w-full object-cover"
        />
        <div className="relative z-10  max-w-[450px] w-full mx-auto p-4 flex gap-3 items-center justify-center">
          {isExpired ? (
            <LiveBox />
          ) : (
            <>
              <CountdownBox value={days} label="Days" />
              <CountdownBox value={hours} label="Hours" />
              <CountdownBox value={minutes} label="Minutes" />
              <CountdownBox value={seconds} label="Seconds" />
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between w-full gap-5">
        <div className="flex flex-col gap-4.5">
          <h1 className="font-medium text-lg sm:text-3xl text-black">{name}</h1>
          <div className="flex items-center gap-1.5">
            <div>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={24} height={24} rx={4} fill="#0E3CE0" />
                <path
                  d="M12 4.5C14.8995 4.5 17.25 6.85051 17.25 9.75C17.25 13.5118 13.4116 15.7753 12.2988 16.3525C12.1092 16.4509 11.8908 16.4509 11.7012 16.3525C10.5884 15.7753 6.75 13.5118 6.75 9.75C6.75 6.85051 9.10051 4.5 12 4.5ZM12 7.5C10.7574 7.5 9.75 8.50736 9.75 9.75C9.75 10.9926 10.7574 12 12 12C13.2426 12 14.25 10.9926 14.25 9.75C14.25 8.50736 13.2426 7.5 12 7.5Z"
                  fill="white"
                />
                <path
                  d="M16.5466 15.375C17.0074 15.717 17.25 16.105 17.25 16.5C17.25 16.895 17.0074 17.283 16.5466 17.625C16.0859 17.967 15.4231 18.2511 14.625 18.4486C13.8269 18.646 12.9216 18.75 12 18.75C11.0784 18.75 10.1731 18.646 9.375 18.4486C8.5769 18.2511 7.91415 17.967 7.45337 17.625C6.99258 17.283 6.75 16.895 6.75 16.5C6.75 16.105 6.99258 15.717 7.45337 15.375"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="font-medium text-sm sm:text-base">{location}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={24} height={24} rx={4} fill="#08AE53" />
              <path
                d="M12 5.25C15.7279 5.25 18.75 8.27208 18.75 12C18.75 15.7279 15.7279 18.75 12 18.75C8.27208 18.75 5.25 15.7279 5.25 12C5.25 8.27208 8.27208 5.25 12 5.25ZM12 7.125C11.5858 7.125 11.25 7.46079 11.25 7.875V11.8125C11.25 12.3303 11.6697 12.75 12.1875 12.75H14.625C15.0392 12.75 15.375 12.4142 15.375 12C15.375 11.5858 15.0392 11.25 14.625 11.25H12.75V7.875C12.75 7.46079 12.4142 7.125 12 7.125Z"
                fill="white"
              />
            </svg>
            <p className="font-medium text-sm sm:text-base">{`${startDate ? formatDate(startDate) : ''} ${endDate ? ` - ${formatDate(endDate)}` : ''}`}</p>
          </div>
        </div>

        <IconButton variant="tertiary">
          <FileUp />
          <span>Export</span>
        </IconButton>
      </div>
    </header>
  );
};
