import Timer, { TimerHandle } from '@/app/components/Timer';
import { render, act } from '@testing-library/react';
import { useEffect, useRef } from 'react';

describe('Timer component', () => {
  jest.useFakeTimers();

  it('should render the progress bar with 100% initial progress', () => {
    const { container } = render(<Timer />);

    const indicator = container.querySelector('.transition-transform') as HTMLElement;
    expect(indicator).toBeInTheDocument();
    expect(indicator.style.transform).toBe('translateX(-0%)'); // 100% progreso
  });

  const TimerWithRef = ({ refCallback }: { refCallback: (ref: TimerHandle) => void }) => {
    const timerRef = useRef<TimerHandle>(null);

    useEffect(() => {
      if (timerRef.current) {
        refCallback(timerRef.current);
      }
    });

    return <Timer ref={timerRef} />;
  };

  it('should start, progress, stop and get elapsed time correctly', async () => {
    let ref: TimerHandle | null = null;

    render(<TimerWithRef refCallback={(r) => (ref = r)} />);
    await act(async () => {}); // da tiempo al efecto

    expect(ref).not.toBeNull();

    act(() => {
      ref!.start();
    });

    act(() => {
      jest.advanceTimersByTime(3000); // 3 segundos simulados
    });

    act(() => {
      ref!.stop();
    });

    const elapsed = ref!.getElapsedTime();
    expect(elapsed).toBeGreaterThanOrEqual(3000);
    expect(elapsed).toBeLessThan(3500);
  });
});
