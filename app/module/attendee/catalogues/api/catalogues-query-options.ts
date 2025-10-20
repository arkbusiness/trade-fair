import { buildQueryParams } from '@/app/core/shared/utils';

export const getCataloguesQueryOptions = ({
  filter
}: {
  filter: Record<string, string>;
}) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: ['exhibitor-catalogue', queryParams],
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
}: {
  filter: Record<string, string>;
}) => {
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
