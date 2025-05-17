'use client';

import * as Progress from '@radix-ui/react-progress';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

export type TimerHandle = {
  stop: () => void;
  start: () => void;
};

const Timer = forwardRef<TimerHandle>((_, ref) => {
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (!intervalRef.current) {
      setProgress(100);
      const totalSeconds = 30;
      const intervalTime = 1000;
      const decrement = 100 / totalSeconds;

      intervalRef.current = setInterval(() => {
        setProgress((prev) => Math.max(prev - decrement, 0));
      }, intervalTime);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useImperativeHandle(ref, () => ({
    start: startTimer,
    stop: stopTimer,
  }));

  const getProgressBarColor = () => {
    if (progress > 50) return 'bg-cyan-500';
    if (progress > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full py-4 border-round">
      <Progress.Root className="relative h-3 bg-cyan-100 overflow-hidden rounded-full">
        <Progress.Indicator
          className={`h-full transition-transform duration-1000 ease-linear ${getProgressBarColor()}`}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
});

Timer.displayName = 'Timer';

export default Timer;
