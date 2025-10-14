import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const attendeeExhibitorsService = {
  getExhibitors: (filter: Record<string, string>) => {
    const queryParams = buildQueryParams({
      params: {
        ...filter
      }
    });

    return {
      url: `/attendee/exhibitors${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['attendee-exhibitors', queryParams]
    };
  },
  addToFavorite: (exhibitorId: string): AxiosRequestConfig => {
    return {
      url: `/attendee/exhibitor/${exhibitorId}/favorite`,
      method: 'POST'
    };
  },
  removeFromFavorite: (exhibitorId: string): AxiosRequestConfig => {
    return {
      url: `/attendee/exhibitor/${exhibitorId}/favorite`,
      method: 'DELETE'
    };
  }
};
