import { buildQueryParams } from '@/app/core/shared/utils';

export const boothsQueryKeys = {
  base: 'booths',
  lists: (filter: Record<string, string>) => [
    boothsQueryKeys.base,
    { ...filter }
  ],
  detail: (id: string) => [boothsQueryKeys.base, 'by-id', id]
};

export const getBoothsQueryOptions = (filter: Record<string, string> = {}) => {
  const queryParams = buildQueryParams({
    params: filter
  });
  return {
    queryKey: boothsQueryKeys.lists(filter),
    url: `/organizer/booths${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getBoothByIdQueryOptions = (id: string) => ({
  queryKey: boothsQueryKeys.detail(id),
  url: `/organizer/booths/${id}`
});
