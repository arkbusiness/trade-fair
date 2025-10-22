import { FilterParams } from '@/app/core/shared/types';
import { buildQueryParams } from '@/app/core/shared/utils';

type CataloguesQueryOptions = {
  exhibitorId: string;
  filter: FilterParams;
};

export const getCataloguesQueryOptions = ({
  exhibitorId,
  filter
}: CataloguesQueryOptions) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: ['exhibitor-catalogue', queryParams, exhibitorId],
    url: `/attendee/catalogue${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getCatalogueByIdQueryOptions = (catalogueId: string) => {
  return {
    queryKey: ['catalogue-details', catalogueId],
    url: `/attendee/catalogue/${catalogueId}`
  };
};

export const getFavoriteCataloguesQueryOptions = ({
  filter
}: Omit<CataloguesQueryOptions, 'exhibitorId'>) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: ['exhibitor-favorite-products', queryParams],
    url: `/attendee/favorite-products${queryParams ? `?${queryParams}` : ''}`
  };
};
