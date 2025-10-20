'use client';

import { useQueryFilters } from '@/app/core/shared/hooks';
import { AttendeeExhibitorTab } from '../molecules';
import { AllAttendeeExhibitors } from '../organisms';

export const AttendeeExhibitorPage = () => {
  const { setFilterParams, filter } = useQueryFilters(['page']);

  const selectedTab = filter?.tab || 'all';

  const handleTabChange = (value: string) => {
    if (value === 'all') {
      setFilterParams({
        tab: 'all'
      });
    } else {
      setFilterParams({
        tab: value
      });
    }
  };

  const handleSearch = (value: string) => {
    setFilterParams({
      search: value?.trim()
    });
  };

  console.log(selectedTab);

  // const isFavouriteTab = selectedTab === 'favourites';
  const isAllTab = selectedTab === 'all';

  return (
    <>
      <AttendeeExhibitorTab
        handleTabChange={handleTabChange}
        handleSearch={handleSearch}
      />
      <div className="mt-8">
        {isAllTab && <AllAttendeeExhibitors filter={filter} />}
      </div>
    </>
  );
};
