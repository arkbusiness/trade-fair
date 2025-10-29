import { buildQueryParams } from '@/app/core/shared/utils';

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
    queryKey: ['attendee-exhibitors', queryParams],
    url: `/attendee/exhibitors${queryParams ? `?${queryParams}` : ''}`
  };
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
    queryKey: ['attendee-favourite-exhibitors', queryParams],
    url: `/attendee/favorite-exhibitors${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getAttendeeExhibitorByIdQueryOptions = ({
  exhibitorId
}: {
  exhibitorId: string;
}) => {
  return {
    queryKey: ['attendee-exhibitor-details', exhibitorId],
    url: `/attendee/exhibitors/${exhibitorId}`
  };
};

export const getAttendeeExhibitorScannedBoothOptions = ({
  exhibitorId
}: {
  exhibitorId: string;
}) => {
  return {
    queryKey: ['exhibitor-scanned', exhibitorId],
    url: `/attendee/exhibitors/${exhibitorId}/scanned`
  };
};
