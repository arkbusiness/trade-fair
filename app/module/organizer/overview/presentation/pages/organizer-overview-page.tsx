import { Suspense } from 'react';
import {
  OrganizerHeader,
  OrganizerOverviewStat,
  OrganizerQuickLinks
} from '../molecules';
import { OrganizerRevenueChart } from '../organisms';

export const OrganizerOverviewPage = () => {
  return (
    <div className="flex flex-col gap-7">
      <Suspense fallback={<div>Loading...</div>}>
        <OrganizerHeader
          location="Grand Hyatt Hotel, Dubai."
          name="African Marketplace"
          startDate="2025-08-14"
          endDate="2025-08-14"
        />
      </Suspense>
      <OrganizerOverviewStat />
      <div className="grid lg:grid-cols-[1fr_27.9rem] gap-x-3 gap-y-5">
        <div className="overflow-hidden w-full">
          <OrganizerRevenueChart />
        </div>
        <OrganizerQuickLinks />
      </div>
    </div>
  );
};
