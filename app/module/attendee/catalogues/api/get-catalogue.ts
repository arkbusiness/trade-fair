import { useCustomQuery } from '@/app/core/shared/hooks';
import { Inventory } from '@/app/module/exhibitor/inventory/hooks';

export const catalogueQueryKeys = {
  base: 'catalogue-details',
  detail: (catalogueId: string) => [catalogueQueryKeys.base, { catalogueId }]
};

const getCatalogueQueryOptions = (catalogueId: string) => ({
  queryKey: catalogueQueryKeys.detail(catalogueId),
  url: `/attendee/catalogue/${catalogueId}`
});

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
