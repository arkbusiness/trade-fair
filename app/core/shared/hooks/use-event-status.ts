import { useMemo } from 'react';
import { differenceInDays, isAfter } from 'date-fns';
import { useOrganizerUser } from '../api';

interface UseEventStatusReturn {
  isOneDayBeforeEvent: boolean;
  isEventConcluded: boolean;
}

/**
 * Hook to check event status based on organizer's event dates
 * Automatically fetches event dates from useOrganizerUser
 * @returns Object containing:
 * - isOneDayBeforeEvent: true if current date is within 1 day before the event starts or the event has concluded (for disabling exhibitor invites)
 * - isEventConcluded: true if the current date is after the event end date (for disabling attendee invites)
 */
export const useEventStatus = (): UseEventStatusReturn => {
  const { user } = useOrganizerUser();

  const currentDate = new Date();

  const eventStartDate = user?.eventStartDate
    ? new Date(user.eventStartDate)
    : undefined;
  const eventEndDate = user?.eventEndDate
    ? new Date(user.eventEndDate)
    : undefined;

  const isOneDayBeforeEvent = useMemo(() => {
    if (!eventStartDate) return false;
    const daysDifference = differenceInDays(eventStartDate, currentDate);
    // Returns true if we're 1 day or less before the event (but event hasn't started yet)
    // OR if the event has already concluded
    const isWithinOneDayBefore = daysDifference <= 1 && daysDifference >= 0;
    const hasEventConcluded = eventEndDate
      ? isAfter(currentDate, eventEndDate)
      : false;
    return isWithinOneDayBefore || hasEventConcluded;
  }, [eventStartDate, eventEndDate, currentDate]);

  const isEventConcluded = useMemo(() => {
    if (!eventEndDate) return false;
    return isAfter(currentDate, eventEndDate);
  }, [eventEndDate, currentDate]);

  return {
    isOneDayBeforeEvent,
    isEventConcluded
  };
};
