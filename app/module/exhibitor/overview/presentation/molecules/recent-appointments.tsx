'use client';

import { LinkButton } from '@/app/core/shared/components/atoms';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { formatSchedule } from '@/app/core/shared/lib';
import { Clock } from 'lucide-react';

const DATA = [
  {
    id: '001',
    startTime: '2025-08-28T05:00:00',
    endTime: '2025-08-28T06:00:00',
    attendee: {
      contactName: 'Tife Johnson'
    }
  },
  {
    id: '002',
    startTime: '2025-08-26T02:00:00',
    endTime: '2025-08-26T03:00:00',
    attendee: {
      contactName: 'Shola Brown'
    }
  },
  {
    id: '003',
    startTime: '2025-08-26T04:30:00',
    endTime: '2025-08-26T05:00:00',
    attendee: {
      contactName: 'Tunde Shola'
    }
  },
  {
    id: '004',
    startTime: '2025-08-26T06:30:00',
    endTime: '2025-08-26T07:00:00',
    attendee: {
      contactName: 'Shola Kemi'
    }
  }
];

export const RecentAppointments = () => {
  // TODO: APPOINTMENT DATA SHOULD BE LIMITED TO 4
  return (
    <div className="rounded-[8px] border border-input bg-background">
      <h2 className="text-lg font-semibold text-foreground px-3.5 py-4.5 border-b">
        Upcoming Appointments
      </h2>
      <div className="mt-7 px-6">
        <div className="flex gap-6 flex-col">
          {DATA.map((item) => {
            return (
              <div
                key={item.id}
                className="flex gap-6 justify-between items-center"
              >
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-full text-light-blue bg-light-blue/10 flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-foreground">
                      {item.attendee.contactName}
                    </p>
                    <p className="text-xs">
                      {formatSchedule(
                        new Date(item.startTime),
                        new Date(item.endTime)
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <LinkButton
                    variant="outline"
                    className="border-light-blue text-light-blue h-[29px] hover:bg-light-blue hover:text-background"
                    href={EXHIBITOR_APP_ROUTES.attendees.appointment.root()}
                  >
                    Details
                  </LinkButton>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-4 mt-7">
          <LinkButton
            variant="tertiary"
            className="max-w-[9.75rem]"
            href={EXHIBITOR_APP_ROUTES.attendees.appointment.root()}
          >
            View All Appointments
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
