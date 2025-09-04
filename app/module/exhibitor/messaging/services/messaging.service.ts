import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const messagingService = {
  getAllMessages: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });

    return {
      url: `/exhibitor/messages${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-messages', queryParams]
    };
  },
  getAttendeeMessages: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });

    return {
      url: `/exhibitor/messages${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['attendee-exhibitor-messages', queryParams]
    };
  },
  postMessage: (
    attendeeId: string,
    data: { content: string }
  ): AxiosRequestConfig => {
    return {
      url: `/exhibitor/messages?attendeeId=${attendeeId}`,
      method: 'POST',
      data
    };
  }
};
