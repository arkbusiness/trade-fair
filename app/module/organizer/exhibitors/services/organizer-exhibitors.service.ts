import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const organizerExhibitorsService = {
  getExhibitors: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });

    return {
      url: `/organizer/invites-exhibitors${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['invites-exhibitors', queryParams]
    };
  },
  getExhibitorById: (id: string) => ({
    url: `/organizer/invites-exhibitors/${id}`,
    queryKey: ['invites-exhibitors-by-id', id]
  }),
  inviteExhibitor: (data: {
    boothNumber: string;
    email: string;
  }): AxiosRequestConfig => ({
    url: `/organizer/invites-exhibitors`,
    method: 'POST',
    data
  }),
  deleteExhibitor: (id: string): AxiosRequestConfig => ({
    url: `/organizer/invites-exhibitors/${id}`,
    method: 'DELETE'
  }),
  deactivateExhibitor: (id: string): AxiosRequestConfig => ({
    url: `/organizer/invites-exhibitors/${id}/deactivate`,
    method: 'PATCH'
  }),
  /**
   * Exports an exhibitor with the given ID.
   *
   * @param {string[]} [data] - An optional array of exhibitor IDs to export.
   */
  exportExhibitor: (data?: string[]): AxiosRequestConfig => ({
    url: `/organizer/invites-exhibitors/export`,
    method: 'POST',
    data
  })
};
