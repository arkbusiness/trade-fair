'use client';

import { useQueryFilters } from '@/app/core/shared/hooks';
import { useSetParams } from '@/app/core/shared/hooks';
import { AttendeeCataloguesTab } from '../molecules';
import { AllCataloguesExhibitors } from '../organisms/all-catalogues-exhibitors';
import { useSearchStore } from '../../slice/search-slice';

export const AttendeeCataloguesPage = () => {
  const { removeQueryParam } = useSetParams();
  const { setFilterParams, filter } = useQueryFilters(['page']);
  const { setSearch } = useSearchStore();

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
    setSearch(value?.trim());
  };

  const selectedTab = filter?.tab || 'all';
  const isAllTab = selectedTab === 'all';
  // const isFavouriteTab = selectedTab === 'favourites';

  return (
    <>
      <AttendeeCataloguesTab
        handleTabChange={handleTabChange}
        handleSearch={handleSearch}
      />
      {isAllTab && <AllCataloguesExhibitors />}
    </>
  );
};
