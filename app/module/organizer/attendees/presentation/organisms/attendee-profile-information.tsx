'use client';

import {
  ContentCard,
  LabelValueCard
} from '@/app/core/shared/components/molecules';
import { useOrganizerAttendeeById } from '../../hooks';

export const AttendeeProfileInformation = ({ id }: { id: string }) => {
  const { attendee } = useOrganizerAttendeeById(id);
  const interests = attendee?.interests ?? [];
  const hasInterests = interests?.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* About */}
      <ContentCard title="Personal Information">
        <div className="flex gap-x-12 gap-y-5 mt-3 flex-wrap pb-10">
          <LabelValueCard
            label="Full Name"
            value={attendee?.contactName ?? 'N/A'}
          />
          <LabelValueCard
            label="Phone Number"
            value={attendee?.phone ?? 'N/A'}
          />
          <LabelValueCard
            label="Email"
            value={
              <>
                <a
                  href={`mailto:${attendee?.email}`}
                  className="text-light-blue-2"
                >
                  {attendee?.email}
                </a>
              </>
            }
          />
        </div>
      </ContentCard>

      {/* Interests */}
      <ContentCard title="Interests">
        <div className="flex gap-x-2 gap-y-4 mt-3 flex-wrap pb-5">
          {hasInterests ? (
            interests.map((interest, index) => {
              const key = `interest-${index}-${interest}`;
              return (
                <div
                  key={key}
                  className="h-[26px] px-2.5 rounded-[23px] flex items-center justify-center  bg-light-blue-2/20 text-light-blue-2"
                >
                  <span className="font-medium text-xs">{interest}</span>
                </div>
              );
            })
          ) : (
            <p className="text-sm flex justify-center">No interests found</p>
          )}
        </div>
      </ContentCard>
    </div>
  );
};
