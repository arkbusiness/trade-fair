'use client';

import { Calendar, Clock3 } from 'lucide-react';
import { formatDate } from '@/app/core/shared/lib';
import { SlotStatus } from '../../api';

interface AppointmentTimeInfoProps {
  startTime?: string;
  endTime?: string;
  status: SlotStatus;
  waitlistPosition?: number | null;
}

export const AppointmentTimeInfo = ({
  startTime,
  endTime,
  status,
  waitlistPosition
}: AppointmentTimeInfoProps) => {
  const isWaitlisted = status === SlotStatus.WAITLISTED;

  if (isWaitlisted) {
    return (
      <div className="flex gap-1 items-center text-blue-600">
        <Clock3 size={15} />
        <p className="font-semibold text-xs opacity-80">
          NO #{waitlistPosition}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 md:items-center flex-col md:flex-row">
      <div className="flex gap-2 items-center">
        <Calendar size={15} />
        <p className="text-xs text-foreground md:hidden">Start:</p>
        <p className="text-xs opacity-80">
          {startTime ? formatDate(startTime, true) : 'Unknown'}
        </p>
      </div>
      <span className="hidden md:flex">-</span>
      <div className="flex gap-2 items-center">
        <Calendar size={15} />
        <p className="text-xs text-foreground md:hidden">End:</p>
        <p className="text-xs opacity-80">
          {endTime ? formatDate(endTime, true) : 'Unknown'}
        </p>
      </div>
    </div>
  );
};
