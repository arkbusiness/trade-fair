import { useCustomQuery } from '@/app/core/shared/hooks';
import { Inventory } from '@/app/module/exhibitor/inventory/api/types';
import { getCatalogueQueryOptions } from './catalogue-query-options';

export const useCatalogueById = (catalogueId: string) => {
  const {
    data: catalogue,
    isLoading,
    isRefetching,
    refetch
  } = useCustomQuery<Inventory>({
    ...getCatalogueQueryOptions(catalogueId),
    options: {
      enabled: !!catalogueId
    }
  });

  return {
    catalogue,
    isLoading,
    isRefetching,
    refetchCatalogue: refetch
  };
};
