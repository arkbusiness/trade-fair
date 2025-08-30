'use client';

import { User } from 'lucide-react';
import { IAppointmentSlot } from '../../hooks';
import { AppointmentAvatar } from './appointment-avatar';
import { AppointmentTimeInfo } from './appointment-time-info';
import { AppointmentStatusBadge } from './appointment-status-badge';

interface AppointmentItemProps {
  appointment: IAppointmentSlot;
}

export const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  const { attendee, startTime, endTime, status, waitlistPosition } =
    appointment;

  return (
    <div className="flex flex-col md:flex-row gap-2 border border-border py-4 rounded-md px-5">
      <AppointmentAvatar attendee={attendee} />

      <div className="flex gap-4 justify-between flex-1">
        <div className="flex flex-col gap-2 pr-5">
          <h4 className="font-medium text-base text-foreground">
            Meeting with {attendee?.contactName || attendee?.email || 'Unknown'}
          </h4>

          {/* Attendee Name */}
          <div className="flex gap-1 items-center">
            <User size={15} />
            <p className="text-xs relative top-0.5 opacity-80">
              {attendee?.contactName ?? 'Unknown'}
            </p>
          </div>

          {/* Time Information */}
          <AppointmentTimeInfo
            startTime={startTime}
            endTime={endTime}
            status={status}
            waitlistPosition={waitlistPosition}
          />
        </div>

        <div>
          <AppointmentStatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};
