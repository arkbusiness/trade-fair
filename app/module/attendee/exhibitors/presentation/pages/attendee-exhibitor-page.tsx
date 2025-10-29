'use client';

import { useQueryFilters } from '@/app/core/shared/hooks';
import { AttendeeExhibitorTab } from '../molecules';
import {
  AllAttendeeExhibitors,
  FavouriteAttendeeExhibitors
} from '../organisms';
import { useSetParams } from '@/app/core/shared/hooks';

export const AttendeeExhibitorPage = () => {
  const { removeQueryParam } = useSetParams();
  const { setFilterParams, filter } = useQueryFilters(['page']);

  const selectedTab = filter?.tab || 'all';

  const handleTabChange = (value: string) => {
    removeQueryParam('page');
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

  const isFavouriteTab = selectedTab === 'favourites';
  const isAllTab = selectedTab === 'all';

  return (
    <>
      <AttendeeExhibitorTab
        handleTabChange={handleTabChange}
        handleSearch={handleSearch}
      />
      <div className="mt-8">
        {isAllTab && <AllAttendeeExhibitors filter={filter} />}
        {isFavouriteTab && <FavouriteAttendeeExhibitors filter={filter} />}
      </div>
    </>
  );
};
