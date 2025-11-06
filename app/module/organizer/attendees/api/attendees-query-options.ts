import { buildQueryParams } from '@/app/core/shared/utils';

export const attendeesQueryKeys = {
  base: 'invites-attendees',
  lists: (filter: Record<string, string>) => [
    attendeesQueryKeys.base,
    { ...filter }
  ],
  detail: (id: string) => [attendeesQueryKeys.base, 'by-id', id]
};

export const getAttendeesQueryOptions = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter
  });
  return {
    queryKey: attendeesQueryKeys.lists(filter),
    url: `/organizer/invites-attendees${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getAttendeeByIdQueryOptions = (id: string) => ({
  queryKey: attendeesQueryKeys.detail(id),
  url: `/organizer/invites-attendees/${id}`
});
