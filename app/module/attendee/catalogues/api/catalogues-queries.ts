import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import {
  getCataloguesQueryOptions,
  getCatalogueByIdQueryOptions,
  getFavoriteCataloguesQueryOptions
} from './catalogues-query-options';
import { Inventory } from '@/app/module/exhibitor/inventory/hooks';

export const useCatalogues = (
  exhibitorId: string,
  filter: Record<string, string>
) => {
  const {
    data: catalogues,
    isLoading: isLoadingCatalogues,
    isRefetching: isRefetchingCatalogues,
    refetch
  } = useCustomQuery<IPaginatedResponse<Inventory>>({
    ...getCataloguesQueryOptions({
      filter: {
        ...filter,
        limit: '15'
      },
      exhibitorId
    }),
    options: {
      enabled: !!exhibitorId
    }
  });
  return {
    catalogues: catalogues?.data ?? EMPTY_ARRAY,
    isLoadingCatalogues,
    isRefetchingCatalogues,
    paginationMeta: extractPaginationMeta(catalogues),
    refetchCatalogues: refetch
  };
};

export const useCatalogueById = (catalogueId: string) => {
  const {
    data: catalogue,
    isLoading: isLoadingCatalogue,
    isRefetching: isRefetchingCatalogue,
    refetch
  } = useCustomQuery<Inventory>({
    ...getCatalogueByIdQueryOptions(catalogueId)
  });
  return {
    catalogue,
    isLoadingCatalogue,
    isRefetchingCatalogue,
    refetchCatalogue: refetch
  };
};

export const useFavoriteCatalogues = (filter: Record<string, string>) => {
  const {
    data: favoriteCatalogues,
    isLoading: isLoadingFavoriteCatalogues,
    isRefetching: isRefetchingFavoriteCatalogues,
    refetch
  } = useCustomQuery<IPaginatedResponse<Inventory>>({
    ...getFavoriteCataloguesQueryOptions({
      filter: {
        ...filter,
        limit: '15'
      }
    })
  });
  return {
    favoriteCatalogues: favoriteCatalogues?.data ?? EMPTY_ARRAY,
    isLoadingFavoriteCatalogues,
    isRefetchingFavoriteCatalogues,
    paginationMeta: extractPaginationMeta(favoriteCatalogues),
    refetchFavoriteCatalogues: refetch
  };
};
