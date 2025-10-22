'use client';

import { useQueryFilters, useSetParams } from '@/app/core/shared/hooks';
import { useSearchSlice } from '../../slice/search-slice';
import { AttendeeCataloguesTab } from '../molecules';
import { AllExhibitorCatalogues } from '../organisms/all-exhibitor-catalogues';
import { AllExhibitorFavouriteCatalogues } from '../organisms/all-exhibitor-favourite-catalogues';

export const AttendeeCataloguesPage = () => {
  const { removeMultipleQueryParams } = useSetParams();
  const { setFilterParams, filter } = useQueryFilters(['page']);
  const { setSearch } = useSearchSlice();

  const clearSearchAndPagination = () => {
    setSearch('');
    removeMultipleQueryParams(['page']);
  };

  const updateTabFilter = (tabValue: string) => {
    setFilterParams({
      tab: tabValue
    });
  };

  const handleTabChange = (value: string) => {
    clearSearchAndPagination();
    updateTabFilter(value);
  };

  const selectedTab = filter?.tab || 'all';
  const isAllTab = selectedTab === 'all';
  const isFavouriteTab = selectedTab === 'favourites';

  return (
    <>
      <AttendeeCataloguesTab handleTabChange={handleTabChange} />
      {isAllTab && <AllExhibitorCatalogues />}
      {isFavouriteTab && <AllExhibitorFavouriteCatalogues />}
    </>
  );
};
