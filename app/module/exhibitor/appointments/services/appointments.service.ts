import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';
import { SlotStatus } from '../hooks';

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
  cancelAppointmentSlot: (id: string): AxiosRequestConfig => {
    return {
      url: `/exhibitor/appointments/slots/${id}/cancel`,
      method: 'PATCH'
    };
  },
  completeAppointmentSlot: (id: string): AxiosRequestConfig => {
    return {
      url: `/exhibitor/appointments/slots/${id}`,
      method: 'PATCH',
      data: {
        status: SlotStatus.COMPLETED
      }
    };
  },
  deleteAppointmentSlot: (id: string): AxiosRequestConfig => {
    return {
      url: `/exhibitor/appointments/slots/${id}`,
      method: 'DELETE'
    };
  },
  createSlot: (
    data: {
      startTime: string;
      endTime: string;
    }[]
  ): AxiosRequestConfig => {
    return {
      url: `/exhibitor/appointments/slots`,
      method: 'POST',
      data: {
        slots: data
      }
    };
  },
  updateSlot: (
    id: string,
    data: {
      startTime: string;
      endTime: string;
    }
  ): AxiosRequestConfig => {
    return {
      url: `/exhibitor/appointments/slots/${id}`,
      method: 'PATCH',
      data
    };
  }
};
