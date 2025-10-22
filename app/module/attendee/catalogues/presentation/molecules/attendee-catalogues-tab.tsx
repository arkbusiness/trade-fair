'use client';

import {
  BorderTab,
  TableSearchInput
} from '@/app/core/shared/components/molecules';
import { useSearchSlice } from '../../slice/search-slice';

const ATTENDEE_CATALOGUES_TAB_LIST = [
  {
    label: 'Catalogues',
    value: 'all'
  },
  {
    label: 'Favourites',
    value: 'favourites'
  }
];

type AttendeeCataloguesTabProps = {
  handleTabChange: (value: string) => void;
};

export const AttendeeCataloguesTab = ({
  handleTabChange
}: AttendeeCataloguesTabProps) => {
  const { setSearch } = useSearchSlice();

  return (
    <div className="flex justify-between gap-x-8 gap-y-5 items-center flex-wrap w-full">
      <BorderTab
        tabs={ATTENDEE_CATALOGUES_TAB_LIST}
        defaultValue={ATTENDEE_CATALOGUES_TAB_LIST[0].value}
        handleSelectedTab={(tab) => {
          handleTabChange(tab.value);
        }}
        rightContent={
          <div className="max-w-[390px] w-full">
            <TableSearchInput
              placeholder="Search product name..."
              handleSearch={(value) => setSearch(value)}
              inputClassName="border-0"
            />
          </div>
        }
      />
    </div>
  );
};
