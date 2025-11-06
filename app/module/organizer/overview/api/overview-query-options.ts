import { buildQueryParams } from '@/app/core/shared/utils';

export const overviewQueryKeys = {
  base: 'organizer-dashboard',
  lists: (filter: Record<string, string>) => [
    overviewQueryKeys.base,
    { ...filter }
  ]
};

export const getOverviewQueryOptions = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter,
    appendDefaultLimit: false
  });
  return {
    queryKey: overviewQueryKeys.lists(filter),
    url: `/organizer/dashboard${queryParams ? `?${queryParams}` : ''}`
  };
};
