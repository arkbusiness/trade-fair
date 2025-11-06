import { buildQueryParams } from '@/app/core/shared/utils';

export const productQueryKeys = {
  base: 'exhibitor-products',
  lists: (filter: Record<string, string>) => [
    productQueryKeys.base,
    { ...filter }
  ],
  detail: (id: string) => ['exhibitor-product', id]
};

export const getProductsQueryOptions = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter
  });
  return {
    queryKey: productQueryKeys.lists(filter),
    url: `/exhibitor/products${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getProductByIdQueryOptions = (id: string) => ({
  queryKey: productQueryKeys.detail(id),
  url: `/exhibitor/products/${id}`
});
