import { playSound } from '../../utils/playSound';

describe('playSound', () => {
  let playMock: jest.SpyInstance;
  let audioConstructorMock: jest.SpyInstance;

  beforeEach(() => {
    playMock = jest.fn();
    audioConstructorMock = jest.spyOn(window, 'Audio').mockImplementation(
      () =>
        ({
          play: playMock,
        } as unknown as HTMLAudioElement),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create an Audio instance with the provided src', () => {
    const src = 'correct';
    playSound(src);
    expect(audioConstructorMock).toHaveBeenCalledWith('/sounds/correct.mp3');
  });

  it('should call play on the Audio instance', () => {
    playSound('incorrect');
    expect(playMock).toHaveBeenCalled();
  });
});
