import { Suspense } from 'react';
import {
  AttendeeOverviewExhibitors,
  AttendeeOverviewHeader,
  AttendeeOverviewStat
} from '../organisms';

export const AttendeeOverviewPage = () => {
  return (
    <div className="flex flex-col gap-7">
      <Suspense fallback={<div>Loading...</div>}>
        <AttendeeOverviewHeader />
      </Suspense>

      <div className="mt-15 flex flex-col gap-5.5">
        <AttendeeOverviewStat />
        <AttendeeOverviewExhibitors />
      </div>
    </div>
  );
};
