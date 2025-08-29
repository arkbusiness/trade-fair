import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const orderService = {
  getOrders: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });
    return {
      url: `/exhibitor/orders/dashboard${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-orders', queryParams]
    };
  },
  getById: (id: string) => {
    return {
      url: `/exhibitor/orders/${id}`,
      queryKey: ['exhibitor-order', id]
    };
  },
  /**
   * Update the status of an order by its ID.
   *
   * @param {string} id - The ID of the order to update.
   * @param {string} status - The new status for the order.
   * @returns {AxiosRequestConfig} - The Axios request configuration object.
   */
  updateStatus: (id: string, status: string): AxiosRequestConfig => {
    return {
      url: `/exhibitor/orders/${id}/status`,
      method: 'PATCH',
      data: {
        status
      }
    };
  },
  updateTracking: (
    id: string,
    tracking: {
      courier: string;
      name: string;
      code: string;
      phone: string;
      note: string;
    }
  ): AxiosRequestConfig => {
    return {
      url: `/exhibitor/orders/${id}/tracking`,
      method: 'PATCH',
      data: tracking
    };
  }
};
