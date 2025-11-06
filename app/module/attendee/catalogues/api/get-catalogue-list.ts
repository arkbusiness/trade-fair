import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { FilterParams, IPaginatedResponse } from '@/app/core/shared/types';
import {
  buildQueryParams,
  extractPaginationMeta
} from '@/app/core/shared/utils';
import { Inventory } from '@/app/module/exhibitor/inventory/api/types';

const DEFAULT_PAGE_SIZE = '15';

export const catalogueListsQueryKeys = {
  base: 'catalogue',
  lists: (exhibitorId: string, filter: FilterParams) => [
    catalogueListsQueryKeys.base,
    { exhibitorId, ...filter }
  ]
};

const getCatalogueListQueryOptions = (
  exhibitorId: string,
  filter: FilterParams
) => {
  const paginatedFilter = {
    ...filter,
    limit: DEFAULT_PAGE_SIZE,
    exhibitorId
  };

  const queryParams = buildQueryParams({ params: paginatedFilter });
  const url = `/attendee/catalogue${queryParams ? `?${queryParams}` : ''}`;

  return {
    queryKey: catalogueListsQueryKeys.lists(exhibitorId, paginatedFilter),
    url
  };
};

export const useCatalogueList = (
  exhibitorId: string,
  filter: FilterParams = {}
) => {
  const { data, isLoading, isRefetching, refetch } = useCustomQuery<
    IPaginatedResponse<Inventory>
  >({
    ...getCatalogueListQueryOptions(exhibitorId, filter),
    options: {
      enabled: !!exhibitorId
    }
  });

  return {
    catalogues: data?.data ?? EMPTY_ARRAY,
    isLoading,
    isRefetching,
    paginationMeta: extractPaginationMeta(data),
    refetchCatalogues: refetch
  };
};
