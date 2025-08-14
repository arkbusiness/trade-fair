import { useState, useEffect } from 'react';

interface TimeRemaining {
  total: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

const getTimeRemaining = (targetDate: Date | string): TimeRemaining => {
  const total = Date.parse(targetDate.toString()) - Date.now();
  const isExpired = total <= 0;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  const padZero = (num: number): string => num.toString().padStart(2, '0');

  return {
    total,
    days: padZero(Math.max(0, days)),
    hours: padZero(Math.max(0, hours)),
    minutes: padZero(Math.max(0, minutes)),
    seconds: padZero(Math.max(0, seconds)),
    isExpired
  };
};

export const useCountdown = (
  targetDate: Date | string,
  onExpire?: () => void
): TimeRemaining => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    getTimeRemaining(targetDate)
  );
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    // Don't start interval if already expired
    if (hasExpired) {
      return;
    }

    const interval = setInterval(() => {
      const updated = getTimeRemaining(targetDate);
      setTimeLeft(updated);

      if (updated.total <= 0) {
        clearInterval(interval);

        // Call the onExpire callback only once when countdown reaches zero
        if (!hasExpired && onExpire) {
          onExpire();
          setHasExpired(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, hasExpired, onExpire]);

  return timeLeft;
};
