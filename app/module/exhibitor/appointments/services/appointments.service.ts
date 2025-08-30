import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const appointmentsService = {
  getAppointmentSlots: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });
    return {
      url: `/exhibitor/appointments/slots${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-appointments', queryParams]
    };
  },
  getStats: () => {
    return {
      url: `/exhibitor/appointments/dashboard`,
      queryKey: ['exhibitor-appointments-stats']
    };
  },
  cancelAppointment: (id: string): AxiosRequestConfig => {
    return {
      url: `/exhibitor/appointments/${id}/cancel`,
      method: 'PATCH'
    };
  }
};
