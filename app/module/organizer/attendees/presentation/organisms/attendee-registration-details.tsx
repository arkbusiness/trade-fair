'use client';

import {
  ContentCard,
  LabelValueCard
} from '@/app/core/shared/components/molecules';
import { formatDate } from '@/app/core/shared/lib';
import { Calendar, CreditCard } from 'lucide-react';
import { useOrganizerAttendeeById } from '../../hooks';

export const AttendeeRegistrationDetails = ({ id }: { id: string }) => {
  const { attendee } = useOrganizerAttendeeById(id);

  return (
    <div className="flex flex-col gap-6">
      {/* Details */}
      <ContentCard title="Registration Details">
        <div className="flex lg:gap-x-24 gap-5 mt-3 pb-7">
          <LabelValueCard
            labelClassName="text-secondary"
            label="Registration Date"
            value={
              <div className="flex items-center gap-[6px] mt-1">
                <Calendar size={16} />
                <span>
                  {attendee?.createdAt ? formatDate(attendee.createdAt) : 'N/A'}
                </span>
              </div>
            }
          />
        </div>
      </ContentCard>

      {/* Timeline */}
      <ContentCard title="Registration Timeline">
        <div className="mt-3 pb-7">
          <div className="flex flex-col gap-6 relative">
            {/* Invite */}
            <div className="flex justify-between items-center relative z-[2] gap-2">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <CreditCard size={14} className="text-white" />
                </div>
                <p className="font-normal text-xs">
                  Invite link <strong>sent</strong>
                </p>
              </div>

              <p className="font-normal text-xs">
                {attendee?.registrationTimeLine?.invited
                  ? formatDate(attendee.registrationTimeLine.invited)
                  : 'Not invited'}
              </p>
            </div>

            <div className="absolute top-0 left-4 w-[1px] h-[56px] bg-border z-[1]" />

            {/* Registration */}
            <div className="flex justify-between items-center relative z-[2] gap-2">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-light-blue flex items-center justify-center">
                  <Calendar size={14} className="text-white" />
                </div>
                <p className="font-normal text-xs">
                  Registration <strong>completed</strong>
                </p>
              </div>

              <p className="font-normal text-xs">
                {attendee?.registrationTimeLine?.registered
                  ? formatDate(attendee.registrationTimeLine.registered)
                  : 'Not registered'}
              </p>
            </div>
          </div>
        </div>
      </ContentCard>
    </div>
  );
};
