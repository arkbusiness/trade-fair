import { buildQueryParams } from '@/app/core/shared/utils';

// Exhibitors list
export const attendeeExhibitorsQueryKeys = {
  base: 'attendee-exhibitors',
  lists: (filter: Record<string, string>) => [
    attendeeExhibitorsQueryKeys.base,
    { ...filter }
  ]
};

export const getAttendeeExhibitorsQueryOptions = ({
  filter
}: {
  filter: Record<string, string>;
}) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: attendeeExhibitorsQueryKeys.lists(filter),
    url: `/attendee/exhibitors${queryParams ? `?${queryParams}` : ''}`
  };
};

// Exhibitor by ID
export const attendeeExhibitorByIdQueryKeys = {
  base: 'attendee-exhibitor-details',
  detail: (exhibitorId: string) => [
    attendeeExhibitorByIdQueryKeys.base,
    exhibitorId
  ]
};

export const getAttendeeExhibitorByIdQueryOptions = ({
  exhibitorId
}: {
  exhibitorId: string;
}) => {
  return {
    queryKey: attendeeExhibitorByIdQueryKeys.detail(exhibitorId),
    url: `/attendee/exhibitors/${exhibitorId}`
  };
};

// Favourite exhibitors
export const attendeeFavouriteExhibitorsQueryKeys = {
  base: 'attendee-favourite-exhibitors',
  lists: (filter: Record<string, string>) => [
    attendeeFavouriteExhibitorsQueryKeys.base,
    { ...filter }
  ]
};

export const getAttendeeFavouriteExhibitorsQueryOptions = ({
  filter
}: {
  filter: Record<string, string>;
}) => {
  const queryParams = buildQueryParams({
    params: {
      ...filter
    }
  });

  return {
    queryKey: attendeeFavouriteExhibitorsQueryKeys.lists(filter),
    url: `/attendee/favorite-exhibitors${queryParams ? `?${queryParams}` : ''}`
  };
};

// Exhibitor scanned booth
export const attendeeExhibitorScannedBoothQueryKeys = {
  base: 'exhibitor-scanned',
  detail: (exhibitorId: string) => [
    attendeeExhibitorScannedBoothQueryKeys.base,
    exhibitorId
  ]
};

export const getAttendeeExhibitorScannedBoothOptions = ({
  exhibitorId
}: {
  exhibitorId: string;
}) => {
  return {
    queryKey: attendeeExhibitorScannedBoothQueryKeys.detail(exhibitorId),
    url: `/attendee/exhibitors/${exhibitorId}/scanned`
  };
};
