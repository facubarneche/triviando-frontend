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
    const src = 'test.mp3';
    playSound(src);
    expect(audioConstructorMock).toHaveBeenCalledWith(src);
  });

  it('should call play on the Audio instance', () => {
    playSound('sound.mp3');
    expect(playMock).toHaveBeenCalled();
  });
});
