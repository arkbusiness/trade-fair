'use client';

import {
  BorderTab,
  TableSearchInput
} from '@/app/core/shared/components/molecules';

const ATTENDEE_EXHIBITOR_TAB_LIST = [
  {
    label: 'All Exhibitors',
    value: 'all'
  },
  {
    label: 'Favourites',
    value: 'favourites'
  }
];

type AttendeeExhibitorTabProps = {
  handleTabChange: (value: string) => void;
  handleSearch: (value: string) => void;
};

export const AttendeeExhibitorTab = ({
  handleTabChange,
  handleSearch
}: AttendeeExhibitorTabProps) => {
  return (
    <div className="flex justify-between gap-x-8 gap-y-5 items-center flex-wrap w-full">
      <BorderTab
        tabs={ATTENDEE_EXHIBITOR_TAB_LIST}
        defaultValue={ATTENDEE_EXHIBITOR_TAB_LIST[0].value}
        handleSelectedTab={(tab) => {
          handleTabChange(tab.value);
        }}
        rightContent={
          <div className="max-w-[390px] w-full">
            <TableSearchInput
              placeholder="Search exhibitors..."
              handleSearch={handleSearch}
              inputClassName="border-0"
            />
          </div>
        }
      />
    </div>
  );
};
