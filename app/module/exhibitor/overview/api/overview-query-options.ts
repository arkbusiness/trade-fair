import { buildQueryParams } from '@/app/core/shared/utils';

export const exhibitorOverviewQueryKeys = {
  base: 'exhibitor-dashboard',
  lists: (filter: Record<string, string>) => [
    exhibitorOverviewQueryKeys.base,
    { ...filter }
  ]
};

export const getExhibitorOverviewQueryOptions = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter,
    appendDefaultLimit: false
  });
  return {
    queryKey: exhibitorOverviewQueryKeys.lists(filter),
    url: `/exhibitor/dashboard${queryParams ? `?${queryParams}` : ''}`
  };
};
