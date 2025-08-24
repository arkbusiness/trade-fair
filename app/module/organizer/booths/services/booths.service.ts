import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const boothsService = {
  getBooths: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });

    return {
      url: `/organizer/booths${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['booths', queryParams]
    };
  },
  createBooth: (data: {
    number: string;
    categoryId: string;
  }): AxiosRequestConfig => ({
    url: `/organizer/booths`,
    method: 'POST',
    data
  }),
  deleteBooth: (id: string): AxiosRequestConfig => ({
    url: `/organizer/booths/${id}`,
    method: 'DELETE'
  }),
  assignExhibitor: (
    id: string,
    data: { exhibitorId: string }
  ): AxiosRequestConfig => ({
    url: `/organizer/booths/${id}/assign`,
    method: 'PUT',
    data
  }),
  unassignExhibitor: (id: string): AxiosRequestConfig => ({
    url: `/organizer/booths/${id}/unassign`,
    method: 'PUT'
  }),
  /**
   * Updates a booth with the given ID.
   *
   * @param {string} id - The ID of the booth to update.
   * @param {Object} data - An object containing the updated booth data.
   * @param {string} data.number - The updated booth number.
   * @param {string} data.category - The updated booth category.
   */
  updateBooth: (
    id: string,
    data: {
      number?: string;
      categoryId?: string;
    }
  ): AxiosRequestConfig => ({
    url: `/organizer/booths/${id}`,
    method: 'PUT',
    data
  }),
  /**
   * Exports a booth with the given ID.
   *
   * @param {string[]} [data] - An optional array of booth IDs to export.
   */
  exportBooth: (data?: string[]): AxiosRequestConfig => ({
    url: `/organizer/booths/export`,
    method: 'POST',
    data
  })
};
