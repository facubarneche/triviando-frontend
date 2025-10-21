import Timer, { TimerHandle } from '@/app/components/Timer';
import { playSound, stopSound } from '@/app/utils/playSound';
import { act, render } from '@testing-library/react';
import { useEffect, useRef } from 'react';

jest.mock('@/app/utils/playSound', () => ({
  playSound: jest.fn(),
  stopSound: jest.fn(),
}));

describe('QuizTimer component', () => {
  jest.useFakeTimers();

  const playSoundMock = playSound as jest.MockedFunction<typeof playSound>;
  const stopSoundMock = stopSound as jest.MockedFunction<typeof stopSound>;

  const TimerWithRef = ({ refCallback }: { refCallback: (ref: TimerHandle) => void }) => {
    const timerRef = useRef<TimerHandle>(null);

    useEffect(() => {
      if (timerRef.current) {
        refCallback(timerRef.current);
      }
    });

    return <Timer ref={timerRef} />;
  };

  beforeEach(() => {
    playSoundMock.mockClear();
    stopSoundMock.mockClear();
  });

  it('should render the progress bar with 100% initial progress', () => {
    const { container } = render(<Timer />);

    const indicator = container.querySelector('.transition-transform') as HTMLElement;
    expect(indicator).toBeInTheDocument();
    expect(indicator.style.transform).toBe('translateX(-0%)');
  });

  it('should start, progress, stop and get elapsed time correctly', async () => {
    let ref: TimerHandle | null = null;

    render(<TimerWithRef refCallback={(r) => (ref = r)} />);
    await act(async () => {});

    expect(ref).not.toBeNull();

    act(() => {
      ref!.start();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    act(() => {
      ref!.stop();
    });

    const elapsed = ref!.getElapsedTime();
    expect(elapsed).toBeGreaterThanOrEqual(3000);
    expect(elapsed).toBeLessThan(3500);
  });

  it('should play phase sounds as the timer advances', () => {
    let ref: TimerHandle | null = null;

    render(<TimerWithRef refCallback={(r) => (ref = r)} />);

    act(() => {
      ref!.start();
    });

    expect(playSoundMock).toHaveBeenCalledWith('timer_safe');
    expect(stopSoundMock).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(26000);
    });

    expect(playSoundMock).toHaveBeenCalledWith('timer_warning');
    expect(stopSoundMock).toHaveBeenCalledWith('timer_safe');

    act(() => {
      jest.advanceTimersByTime(14000);
    });

    expect(playSoundMock).toHaveBeenCalledWith('timer_critical');
    expect(stopSoundMock).toHaveBeenCalledWith('timer_warning');

    act(() => {
      ref!.stop();
    });

    expect(stopSoundMock).toHaveBeenCalledWith('timer_critical');
  });
});
