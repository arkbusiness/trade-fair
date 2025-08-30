'use client';

import { SlotStatus } from '../../hooks';
import { cn } from '@/app/core/shared/utils';
import { APPOINTMENT_STATUS_MAP } from '../organisms';

interface AppointmentStatusBadgeProps {
  status: SlotStatus;
}

export const AppointmentStatusBadge = ({
  status
}: AppointmentStatusBadgeProps) => {
  const statusConfig = APPOINTMENT_STATUS_MAP[status];

  return (
    <span
      className={cn(
        'px-2 h-[32px] max-w-min rounded-[4px] text-xs flex justify-center items-center relative font-medium',
        statusConfig?.style?.bg,
        statusConfig?.style?.text
      )}
    >
      <span>{statusConfig?.label}</span>
    </span>
  );
};
