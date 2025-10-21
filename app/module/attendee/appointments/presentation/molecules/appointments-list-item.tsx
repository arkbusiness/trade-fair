'use client';

import { formatDate } from '@/app/core/shared/lib';
import { cn } from '@/app/core/shared/utils';
import { IAttendeeMeeting } from '../../../meetings/api';

interface AppointmentsListItemProps {
  appointment: IAttendeeMeeting;
  onClick: () => void;
}

export const AppointmentsListItem = ({
  appointment,
  onClick
}: AppointmentsListItemProps) => {
  const isAvailable = appointment.status?.toLowerCase() === 'available';

  const { startTime, endTime } = appointment;

  return (
    <div
      className="flex flex-col md:flex-row gap-2 border border-border py-4 rounded-md px-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between w-full">
        <div className="flex gap-2 md:items-center flex-col md:flex-row">
          <div className="flex gap-2 items-center">
            <p className="text-sm text-foreground sm:hidden">Start:</p>
            <p className="text-sm opacity-80">
              {startTime
                ? formatDate(startTime, false, 'MMM dd, yyyy : hh:mm a')
                : 'Unknown'}
            </p>
          </div>
          <span className="hidden md:flex">-</span>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-foreground sm:hidden">End:</p>
            <p className="text-sm opacity-80">
              {endTime
                ? formatDate(endTime, false, 'MMM dd, yyyy : hh:mm a')
                : 'Unknown'}
            </p>
          </div>
        </div>

        <div className="flex items-center flex-col gap-3">
          <p
            className={cn('text-sm text-secondary font-medium', {
              'text-green-600': isAvailable
            })}
          >
            {isAvailable ? 'Available' : 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
};
