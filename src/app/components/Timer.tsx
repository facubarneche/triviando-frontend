'use client';

import * as Progress from '@radix-ui/react-progress';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { playSound, stopSound, type SoundType } from '@/app/utils/playSound';

export type TimerHandle = {
  stop: () => void;
  start: () => void;
  getElapsedTime: () => number;
};

type TimerPhase = 'safe' | 'warning' | 'critical';

const TIMER_DURATION_SECONDS = 24.5;
const TICK_INTERVAL_MS = 1000;
const PROGRESS_DECREMENT = 100 / TIMER_DURATION_SECONDS;

const PHASE_CONFIG: Record<
  TimerPhase,
  {
    threshold: number;
    className: string;
  }
> = {
  safe: {
    threshold: 50,
    className: 'bg-cyan-500',
  },
  warning: {
    threshold: 20.2,
    className: 'bg-yellow-500',
  },
  critical: {
    threshold: 0,
    className: 'bg-red-500',
  },
};

const resolvePhase = (value: number): TimerPhase => {
  if (value > PHASE_CONFIG.safe.threshold) {
    return 'safe';
  }
  if (value > PHASE_CONFIG.warning.threshold) {
    return 'warning';
  }
  return 'critical';
};

const PHASE_SOUNDS: Record<TimerPhase, SoundType> = {
  safe: 'timer_safe',
  warning: 'timer_warning',
  critical: 'timer_critical',
};

const Timer = forwardRef<TimerHandle>((_, ref) => {
  const [progress, setProgress] = useState(100);
  const [phase, setPhase] = useState<TimerPhase>('safe');

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);
  const lastPlayedPhaseRef = useRef<TimerPhase | null>(null);
  const activeSoundRef = useRef<SoundType | null>(null);

  const stopActivePhaseSound = useCallback(() => {
    if (!activeSoundRef.current) {
      return;
    }

    stopSound(activeSoundRef.current);
    activeSoundRef.current = null;
  }, []);

  const stopTimer = useCallback(() => {
    if (!intervalRef.current) {
      return;
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;

    if (startTimeRef.current) {
      elapsedTimeRef.current = Date.now() - startTimeRef.current;
      startTimeRef.current = null;
    }

    stopActivePhaseSound();
  }, [stopActivePhaseSound]);

  const emitPhaseSound = useCallback(
    (nextPhase: TimerPhase) => {
      if (lastPlayedPhaseRef.current === nextPhase) {
        return;
      }

      stopActivePhaseSound();

      lastPlayedPhaseRef.current = nextPhase;
      setPhase(nextPhase);
      const soundType = PHASE_SOUNDS[nextPhase];
      activeSoundRef.current = soundType;
      playSound(soundType);
    },
    [stopActivePhaseSound],
  );

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      return;
    }

    setProgress(100);
    lastPlayedPhaseRef.current = null;
    emitPhaseSound('safe');

    startTimeRef.current = Date.now();
    elapsedTimeRef.current = 0;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = Math.max(prev - PROGRESS_DECREMENT, 0);
        const nextPhase = resolvePhase(nextProgress);

        emitPhaseSound(nextPhase);

        if (nextProgress === 0) {
          stopTimer();
        }

        return nextProgress;
      });
    }, TICK_INTERVAL_MS);
  }, [emitPhaseSound, stopTimer]);

  const getElapsedTime = useCallback(() => {
    if (intervalRef.current && startTimeRef.current) {
      return Date.now() - startTimeRef.current;
    }

    return elapsedTimeRef.current;
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      start: startTimer,
      stop: stopTimer,
      getElapsedTime,
    }),
    [getElapsedTime, startTimer, stopTimer],
  );

  const indicatorClass = PHASE_CONFIG[phase].className;

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return (
    <div className="w-full py-4 border-round">
      <Progress.Root className="relative h-3 overflow-hidden rounded-full bg-cyan-100">
        <Progress.Indicator
          className={`h-full transition-transform duration-1000 ease-linear ${indicatorClass}`}
          style={{ transform: `translateX(-${100 - progress}%)` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </Progress.Root>
    </div>
  );
});

Timer.displayName = 'Timer';

export default Timer;
