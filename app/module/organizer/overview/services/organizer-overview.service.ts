import { buildQueryParams } from '@/app/core/shared/utils';

export const organizerOverviewService = {
  getMetrics: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter,
      appendDefaultLimit: false
    });
    return {
      url: `/organizer/dashboard${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['organizer-dashboard', queryParams]
    };
  }
};
