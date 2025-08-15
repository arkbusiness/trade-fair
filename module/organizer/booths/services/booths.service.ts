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
  assignExhibitor: (id: string): AxiosRequestConfig => ({
    url: `/organizer/booths/${id}/assign`,
    method: 'PUT'
  }),
  /**
   * Updates a booth with the given ID.
   *
   * @param {string} id - The ID of the booth to update.
   * @param {Object} data - An object containing the updated booth data.
   * @param {string} data.number - The updated booth number.
   * @param {string} data.category - The updated booth category.
   * @return {AxiosRequestConfig} The Axios request configuration for the update request.
   */
  updateBooth: (
    id: string,
    data: {
      number: string;
      categoryId: string;
    }
  ): AxiosRequestConfig => ({
    url: `/organizer/booths/${id}`,
    method: 'PUT',
    data
  })
};
