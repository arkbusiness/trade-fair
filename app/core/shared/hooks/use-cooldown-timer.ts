import { useState, useEffect } from 'react';

export const useCooldownTimer = (initialCooldown = 30) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCooldownRunning, setIsCooldownRunning] = useState(false);

  const startTimer = () => {
    if (!isCooldownRunning) {
      setIsCooldownRunning(true);
      setTimeRemaining(initialCooldown);
    }
  };

  useEffect(() => {
    if (isCooldownRunning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      setIsCooldownRunning(false);
    }
  }, [isCooldownRunning, timeRemaining]);

  return {
    timeRemaining,
    isCooldownRunning,
    startTimer
  };
};
