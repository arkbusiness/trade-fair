'use client';

import { BorderTab } from '@/app/core/shared/components/molecules';
import { useState } from 'react';
import { AttendeeExhibitorDetailsInfo } from './attendee-exhibitor-details-info';
import { AttendeeExhibitorDetailsProducts } from './attendee-exhibitor-details-products';

const TABS_ITEMS = [
  {
    value: 'info',
    label: 'Info'
  },
  {
    value: 'products',
    label: 'Products'
  }
];

interface AttendeeExhibitorDetailsTabProps {
  exhibitorId: string;
}

export const AttendeeExhibitorDetailsTab = ({
  exhibitorId
}: AttendeeExhibitorDetailsTabProps) => {
  const [selectedTab, setSelectedTab] = useState(TABS_ITEMS[0].value);

  const isInfoTab = selectedTab === 'info';
  const isProductsTab = selectedTab === 'products';

  return (
    <>
      <BorderTab
        tabs={TABS_ITEMS}
        defaultValue={selectedTab}
        handleSelectedTab={(tab) => setSelectedTab(tab.value)}
        tabTriggerClassName="max-w-[8rem] w-full"
        tabListClassName="h-[3rem]"
        tabListContainerClassName="hidden sm:flex lg:flex"
        selectContainerClassName="sm:hidden"
      />

      {isInfoTab && <AttendeeExhibitorDetailsInfo id={exhibitorId} />}
      {isProductsTab && (
        <AttendeeExhibitorDetailsProducts exhibitorId={exhibitorId} />
      )}
    </>
  );
};
