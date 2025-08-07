import { format, formatDistance, isValid, parseISO } from 'date-fns';

/**
 * Formats the distance between two dates with optional suffix
 * @param date The date to compare (or number of days in past if isDaysAgo=true)
 * @param baseDate The base date to compare against (defaults to now)
 * @returns Human-readable distance string
 */
export function distanceFormat(
  date: string,
  baseDate: Date = new Date()
): string {
  const actualDate = new Date(date);

  return formatDistance(actualDate, baseDate, {
    addSuffix: true
  });
}

/**
 * Formats a date string or Date object into "Month Day, Year, Time" (e.g., March 16, 2023, 12:01 AM).
 * @param {string} date - The date to format (ISO string, JS Date, or parsable string).
 * @returns {string} Formatted date and time (e.g., "March 16, 2023, 12:01 AM").
 */
export function formatDate(
  date: string,
  includeTime = false,
  dateFormat = 'MMMM d, yyyy'
): string {
  let dateObj;

  if (typeof date === 'string') {
    dateObj = parseISO(date);
    if (!isValid(dateObj)) {
      // Fallback for non-ISO strings (e.g., "03/16/2023")
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }

  if (!isValid(dateObj) || !dateObj) {
    return 'Invalid date';
  }

  if (includeTime) {
    dateFormat = 'MMMM d, yyyy, h:mm a';
  }

  return format(dateObj, dateFormat);
}

export function formatTime(date: string): string {
  let dateObj;

  if (typeof date === 'string') {
    dateObj = parseISO(date);
    if (!isValid(dateObj)) {
      // Fallback for non-ISO strings (e.g., "03/16/2023")
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }

  if (!isValid(dateObj) || !dateObj) {
    return 'Invalid time';
  }

  return format(dateObj, 'h:mm a');
}
