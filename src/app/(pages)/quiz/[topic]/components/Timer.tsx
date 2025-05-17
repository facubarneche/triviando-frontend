'use client';

import { Progress } from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';

const Timer = () => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const totalSeconds = 30;
    const intervalTime = 1000;
    const decrement = 100 / totalSeconds;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev - decrement;
        return next <= 0 ? 0 : next;
      });
    }, intervalTime);

    // Se limpia intervalo
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <Progress value={progress} className="h-3 bg-cyan-100" />
    </div>
  );
};

export default Timer;
