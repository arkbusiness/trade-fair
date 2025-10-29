import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { FilterParams, IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { Inventory } from '@/app/module/exhibitor/inventory/hooks';

const DEFAULT_PAGE_SIZE = '15';

export const favouriteCataloguesQueryKeys = {
  base: 'favourite-catalogues',
  lists: (filter: FilterParams) => [
    favouriteCataloguesQueryKeys.base,
    { ...filter }
  ]
};

const getFavouriteCatalogueQueryOptions = (filter: FilterParams) => {
  const paginatedFilter = {
    ...filter,
    limit: DEFAULT_PAGE_SIZE
  };

  const queryParams = buildQueryParams({ params: paginatedFilter });
  const url = `/attendee/favorite-products${queryParams ? `?${queryParams}` : ''}`;

  return {
    queryKey: favouriteCataloguesQueryKeys.lists(paginatedFilter),
    url
  };
};

export const useFavouriteCatalogueList = (filter: FilterParams = {}) => {
  const { data, isLoading, isRefetching } = useCustomQuery<
    IPaginatedResponse<Inventory>
  >({
    ...getFavouriteCatalogueQueryOptions(filter)
  });

  return {
    catalogues: data?.data ?? EMPTY_ARRAY,
    isLoading,
    isRefetching,
    paginationMeta: extractPaginationMeta(data)
  };
};
