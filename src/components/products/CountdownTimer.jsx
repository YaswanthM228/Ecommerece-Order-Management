import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CountdownTimer = ({ initialHours = 8, initialMinutes = 24, initialSeconds = 15 }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 }; // reset demo loop
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format2Digits = (num) => String(num).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
      <Clock className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
      <span>Ends In</span>
      <span className="font-mono tracking-wider font-extrabold text-rose-600 dark:text-rose-300">
        {format2Digits(timeLeft.hours)} : {format2Digits(timeLeft.minutes)} : {format2Digits(timeLeft.seconds)}
      </span>
    </div>
  );
};
