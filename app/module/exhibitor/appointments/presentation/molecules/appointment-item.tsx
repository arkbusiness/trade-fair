'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { User } from 'lucide-react';
import { IAppointmentSlot, SlotStatus } from '../../hooks';
import { AppointmentStatusBadge } from './appointment-status-badge';
import { AppointmentTimeInfo } from './appointment-time-info';

interface AppointmentItemProps {
  appointment: IAppointmentSlot;
  handleView: (appointment: IAppointmentSlot) => void;
}

export const AppointmentItem = ({
  appointment,
  handleView
}: AppointmentItemProps) => {
  const { attendee, startTime, endTime, status, waitlistPosition } =
    appointment;

  const mapContent = {
    [SlotStatus.BOOKED]: {
      title: `Meeting with ${attendee?.contactName || attendee?.email || 'Unknown'}`,
      image: <User size={15} />,
      attendee: attendee?.contactName ?? 'Unknown'
    },
    [SlotStatus.WAITLISTED]: {
      title: ``,
      image: null,
      attendee: null
    },
    [SlotStatus.CANCELLED]: {
      title: `Meeting with ${attendee?.contactName || attendee?.email || 'Unknown'}`,
      image: <User size={15} />,
      attendee: attendee?.contactName ?? 'Unknown'
    },
    [SlotStatus.COMPLETED]: {
      title: `Meeting with ${attendee?.contactName || attendee?.email || 'Unknown'}`,
      image: <User size={15} />,
      attendee: attendee?.contactName ?? 'Unknown'
    },
    [SlotStatus.AVAILABLE]: {
      title: `Slot-#${appointment?.id?.slice(0, 5)}`,
      image: <User size={15} />,
      attendee: 'Not Booked'
    }
  };

  const content = mapContent[status];

  return (
    <div className="flex flex-col md:flex-row gap-2 border border-border py-4 rounded-md px-5">
      {/* {appointment?.attendee && (
        <AppointmentAvatar attendee={attendee} />
      )} */}

      <div className="flex gap-4 justify-between flex-1 flex-col md:flex-row">
        <div className="flex flex-col gap-2 pr-5">
          {content.title && (
            <h4 className="font-medium text-base text-foreground">
              {content.title}
            </h4>
          )}

          {/* Attendee Name */}
          {content.attendee && (
            <div className="flex gap-1 items-center">
              {content.image}
              <p className="text-xs relative top-0.5 opacity-80">
                {content.attendee}
              </p>
            </div>
          )}

          {/* Time Information */}
          <AppointmentTimeInfo
            startTime={startTime}
            endTime={endTime}
            status={status}
            waitlistPosition={waitlistPosition}
          />
        </div>

        <div className="flex flex-col gap-4 justify-between">
          <AppointmentStatusBadge status={status} />
          <Button
            variant="ghost"
            className="self-start h-8 text-light-blue-2"
            onClick={() => handleView(appointment)}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
