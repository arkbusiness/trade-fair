import { buildQueryParams } from '@/app/core/shared/utils';

export const exhibitorsQueryKeys = {
  base: 'invites-exhibitors',
  lists: (filter: Record<string, string>) => [
    exhibitorsQueryKeys.base,
    { ...filter }
  ],
  detail: (id: string) => [exhibitorsQueryKeys.base, 'by-id', id]
};

export const getExhibitorsQueryOptions = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter
  });
  return {
    queryKey: exhibitorsQueryKeys.lists(filter),
    url: `/organizer/invites-exhibitors${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getExhibitorByIdQueryOptions = (id: string) => ({
  queryKey: exhibitorsQueryKeys.detail(id),
  url: `/organizer/invites-exhibitors/${id}`
});
