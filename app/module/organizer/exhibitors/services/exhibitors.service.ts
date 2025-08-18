import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const exhibitorsService = {
  getExhibitors: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });

    return {
      url: `/organizer/exhibitors${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitors', queryParams]
    };
  },
  inviteExhibitor: (data: {
    boothNumber: string;
    email: string;
  }): AxiosRequestConfig => ({
    url: `/organizer/invites-exhibitors`,
    method: 'POST',
    data
  }),
  deleteExhibitor: (id: string): AxiosRequestConfig => ({
    url: `/organizer/exhibitors/${id}`,
    method: 'DELETE'
  }),
  updateExhibitor: (
    id: string,
    data: {
      number: string;
      categoryId: string;
    }
  ): AxiosRequestConfig => ({
    url: `/organizer/exhibitors/${id}`,
    method: 'PUT',
    data
  })
};
