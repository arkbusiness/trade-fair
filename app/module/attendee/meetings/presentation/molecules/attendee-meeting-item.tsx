'use client';

import { BoardIcon } from '@/app/core/shared/components/atoms';
import { formatDate } from '@/app/core/shared/lib';
import { SlotStatus } from '@/app/module/exhibitor/appointments/hooks';
import { AppointmentStatusBadge } from '@/app/module/exhibitor/appointments/presentation/molecules';
import { Calendar, User } from 'lucide-react';
import { IAttendeeMeeting } from '../../api';

interface AttendeeMeetingItemProps {
  appointment: IAttendeeMeeting;
}

export const AttendeeMeetingItem = ({
  appointment
}: AttendeeMeetingItemProps) => {
  const { exhibitor, startTime, endTime, status, waitlistPosition } =
    appointment;

  const mapContent = {
    [SlotStatus.BOOKED]: {
      title: `Meeting with ${exhibitor?.contactName || 'Unknown'}`,
      image: <User size={15} />,
      exhibitor: exhibitor?.contactName ?? 'Unknown'
    },
    [SlotStatus.WAITLISTED]: {
      title: exhibitor?.contactName || 'Unknown',
      image: <User size={15} />,
      exhibitor: exhibitor?.contactName ?? 'Unknown'
    },
    [SlotStatus.CANCELLED]: {
      title: `Meeting with ${exhibitor?.contactName || 'Unknown'}`,
      image: <User size={15} />,
      exhibitor: exhibitor?.contactName ?? 'Unknown'
    },
    [SlotStatus.COMPLETED]: {
      title: `Meeting with ${exhibitor?.contactName || 'Unknown'}`,
      image: <User size={15} />,
      exhibitor: exhibitor?.contactName ?? 'Unknown'
    },
    [SlotStatus.AVAILABLE]: {
      title: `Slot-#${appointment?.id?.slice(0, 5)}`,
      image: <User size={15} />,
      exhibitor: 'Not Booked'
    }
  };

  const content = mapContent[status];

  const isWaitlisted = status === SlotStatus.WAITLISTED;

  return (
    <div className="flex flex-col md:flex-row gap-2 border border-border py-4 rounded-md px-5">
      <div className="flex gap-4 justify-between flex-1 flex-col md:flex-row">
        <div className="flex flex-col gap-2 pr-5">
          {content.title && (
            <h4 className="font-medium text-base text-foreground">
              {content.title}
            </h4>
          )}

          {/* Attendee Name */}
          {content.exhibitor && (
            <div className="flex gap-1 items-center">
              {content.image}
              <p className="text-sm relative top-0.5 opacity-80">
                {content.exhibitor}
              </p>
            </div>
          )}

          {!isWaitlisted && (
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
          )}

          {isWaitlisted && (
            <div className="flex gap-1 items-center text-blue-600">
              <BoardIcon />
              <p className="font-semibold text-sm opacity-80">
                NO #{waitlistPosition}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 justify-between">
          <AppointmentStatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};
