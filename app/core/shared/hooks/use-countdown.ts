import { useState, useEffect } from 'react';
import {
  parseISO,
  isValid,
  isAfter,
  differenceInSeconds,
  isBefore
} from 'date-fns';

interface TimeRemaining {
  total: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
  isLive: boolean;
}

const getTimeRemaining = (
  endDate: Date | string | undefined,
  startDate?: Date | string | undefined
): TimeRemaining => {
  const now = new Date();

  // Parse and validate target date
  let target: Date;

  if (!endDate) {
    console.warn('No end date provided to countdown hook');
    return {
      total: 0,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      isExpired: true,
      isLive: false
    };
  }

  if (typeof endDate === 'string') {
    target = parseISO(endDate);
  } else {
    target = endDate;
  }

  if (!isValid(target)) {
    console.warn('Invalid target date provided to countdown hook');
    return {
      total: 0,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      isExpired: true,
      isLive: false
    };
  }

  // Parse and validate start date if provided
  let start: Date | null = null;
  if (startDate) {
    if (typeof startDate === 'string') {
      start = parseISO(startDate);
    } else {
      start = startDate;
    }

    if (!isValid(start)) {
      console.warn('Invalid start date provided to countdown hook');
      start = null;
    }

    // Handle case where start date is after target date
    if (start && isAfter(start, target)) {
      console.warn('Start date is after target date in countdown hook');
      return {
        total: 0,
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        isExpired: true,
        isLive: false
      };
    }
  }

  const totalSeconds = differenceInSeconds(target, now);

  // isExpired: current date > target date
  const isExpired = isAfter(now, target);

  // isLive: start date <= current date < target date
  const isLive = start
    ? !isBefore(now, start) && isBefore(now, target)
    : !isExpired;

  // Handle negative values for time calculations
  const absoluteTotal = Math.abs(totalSeconds);
  const seconds = Math.floor(absoluteTotal % 60);
  const minutes = Math.floor((absoluteTotal / 60) % 60);
  const hours = Math.floor((absoluteTotal / 3600) % 24);
  const days = Math.floor(absoluteTotal / 86400);

  const padZero = (num: number): string => num.toString().padStart(2, '0');

  return {
    total: totalSeconds,
    days: padZero(Math.max(0, days)),
    hours: padZero(Math.max(0, hours)),
    minutes: padZero(Math.max(0, minutes)),
    seconds: padZero(Math.max(0, seconds)),
    isExpired,
    isLive
  };
};

export const useCountdown = ({
  startDate,
  endDate,
  onExpire
}: {
  startDate: Date | string | undefined;
  endDate: Date | string | undefined;
  onExpire?: () => void;
}): TimeRemaining => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    getTimeRemaining(endDate, startDate)
  );
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    // Reset hasExpired if dates change
    const current = getTimeRemaining(endDate, startDate);
    if (!current.isExpired && hasExpired) {
      setHasExpired(false);
    }

    // Don't start interval if already expired
    if (current.isExpired) {
      setTimeLeft(current);
      return;
    }

    const interval = setInterval(() => {
      const updated = getTimeRemaining(endDate, startDate);
      setTimeLeft(updated);

      if (updated.isExpired) {
        clearInterval(interval);

        // Call the onExpire callback only once when countdown reaches zero
        if (!hasExpired && onExpire) {
          onExpire();
          setHasExpired(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, startDate, hasExpired, onExpire]);

  return timeLeft;
};
