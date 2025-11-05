import { Suspense } from 'react';
import { OrganizerOverviewStat, OrganizerQuickLinks } from '../molecules';
import { OrganizerHeader, OrganizerRevenueChart } from '../organisms';

export const OrganizerOverviewPage = () => {
  return (
    <div className="flex flex-col gap-7 pb-40">
      <Suspense fallback={<div>Loading...</div>}>
        <OrganizerHeader />
      </Suspense>
      <OrganizerOverviewStat />
      <div className="grid lg:grid-cols-[1fr_27.9rem] gap-x-3 gap-y-5">
        <div className="w-full">
          <OrganizerRevenueChart />
        </div>
        <OrganizerQuickLinks />
      </div>
    </div>
  );
};
