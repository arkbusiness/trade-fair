import {
  differenceInMinutes,
  format,
  formatDistance,
  isToday,
  isTomorrow,
  isValid,
  parseISO
} from 'date-fns';

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

/**
 * Formats a schedule time range into a human-friendly string.
 *
 * Examples:
 * - Today, 2:00 PM  (30 min )
 * - Tomorrow, 10:00 AM  (45 min )
 * - Fri, Aug 29, 9:00 AM  (1 hr 15 min )
 *
 * Edge cases handled:
 * - Invalid dates → returns an empty string
 * - End time before start time → returns "Invalid time range"
 * - Zero duration → returns "0 min"
 * - Duration >= 60 → shows hours + minutes (e.g. "1 hr 30 min")
 *
 * @param startTime - The start time of the event.
 * @param endTime - The end time of the event.
 */
export function formatSchedule(
  startTime: Date,
  endTime: Date
): {
  dayLabel: string;
  timeLabel: string;
  durationLabel: string;
  fullLabel: string;
} {
  // Validate dates
  if (!isValid(startTime) || !isValid(endTime)) {
    return {
      dayLabel: '',
      timeLabel: '',
      durationLabel: '',
      fullLabel: ''
    };
  }

  // Check invalid range
  if (endTime < startTime) {
    return {
      dayLabel: '',
      timeLabel: '',
      durationLabel: '',
      fullLabel: 'Invalid time range'
    };
  }

  // Calculate duration
  const totalMinutes = differenceInMinutes(endTime, startTime);

  // Format duration smartly
  let durationLabel: string;
  if (totalMinutes === 0) {
    durationLabel = '0 min';
  } else if (totalMinutes < 60) {
    durationLabel = `${totalMinutes} min`;
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    durationLabel = minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
  }

  // Format day label
  let dayLabel: string;
  if (isToday(startTime)) {
    dayLabel = 'Today';
  } else if (isTomorrow(startTime)) {
    dayLabel = 'Tomorrow';
  } else {
    dayLabel = format(startTime, 'EEE, MMM d'); // e.g. Fri, Aug 29
  }

  // Format time
  const timeLabel = format(startTime, 'h:mm a');

  return {
    dayLabel,
    timeLabel,
    durationLabel,
    fullLabel: `${dayLabel}, ${timeLabel}  (${durationLabel})`
  };
}
