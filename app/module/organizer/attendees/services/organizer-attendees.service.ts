import { buildQueryParams } from '@/app/core/shared/utils';
import { AxiosRequestConfig } from 'axios';

export const organizerAttendeesService = {
  getAttendees: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });

    return {
      url: `/organizer/invites-attendees${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['invites-attendees', queryParams]
    };
  },
  getAttendeeById: (id: string) => ({
    url: `/organizer/invites-attendees/${id}`,
    queryKey: ['invites-attendees-by-id', id]
  }),
  inviteAttendee: (data: { email: string }): AxiosRequestConfig => ({
    url: `/organizer/attendee-invites`,
    method: 'POST',
    data
  }),
  deleteAttendee: (id: string): AxiosRequestConfig => ({
    url: `/organizer/invites-attendees/${id}`,
    method: 'DELETE'
  }),
  /**
   * Exports attendees with the given IDs.
   *
   * @param {string[]} [data] - An optional array of attendee IDs to export.
   */
  exportAttendee: (data?: string[]): AxiosRequestConfig => ({
    url: `/organizer/invites-attendees/export`,
    method: 'POST',
    data
  })
};
