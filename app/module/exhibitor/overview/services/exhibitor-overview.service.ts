import { buildQueryParams } from '@/app/core/shared/utils';

export const exhibitorOverviewService = {
  getMetrics: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter,
      appendDefaultLimit: false
    });
    return {
      url: `/exhibitor/dashboard${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-dashboard', queryParams]
    };
  }
};
