export const catalogueQueryKeys = {
  base: 'catalogue-details',
  detail: (catalogueId: string) => [catalogueQueryKeys.base, { catalogueId }]
};

export const getCatalogueQueryOptions = (catalogueId: string) => ({
  queryKey: catalogueQueryKeys.detail(catalogueId),
  url: `/attendee/catalogue/${catalogueId}`
});
