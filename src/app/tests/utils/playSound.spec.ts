import {
  __resetSoundCache,
  playSound,
  playSoundFromUrl,
  stopAllSounds,
  stopSound,
  setGlobalVolume,
} from '../../utils/playSound';

describe('playSound', () => {
  type AudioMock = {
    src: string;
    play: jest.Mock<Promise<void>, []>;
    pause: jest.Mock<void, []>;
    currentTime: number;
    preload: string;
    volume: number;
  };

  let audioConstructorMock: jest.SpyInstance<HTMLAudioElement, [string?]>;
  let audioMocks: AudioMock[];

  beforeEach(() => {
    audioMocks = [];
    audioConstructorMock = jest.spyOn(window, 'Audio').mockImplementation((src?: string) => {
      const audioMock: AudioMock = {
        src: src ?? '',
        play: jest.fn().mockResolvedValue(undefined),
        pause: jest.fn(),
        currentTime: 0,
        preload: '',
        volume: 1,
      };

      audioMocks.push(audioMock);
      return audioMock as unknown as HTMLAudioElement;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    __resetSoundCache();
  });

  it('should create an Audio instance with the provided src', () => {
    const src = 'correct_answer';
    playSound(src);
    expect(audioConstructorMock).toHaveBeenCalledWith('/sounds/correct_answer.mp3');
  });

  it('should call play on the Audio instance', () => {
    playSound('incorrect');
    expect(audioMocks[0].play).toHaveBeenCalled();
  });

  it('should clamp custom volume when provided', () => {
    playSound('hover', 2);
    expect(audioMocks[0].volume).toBe(1);
  });

  it('should play sound from custom url', () => {
    playSoundFromUrl('/custom/sound.mp3');
    expect(audioConstructorMock).toHaveBeenCalledWith('/custom/sound.mp3');
    expect(audioMocks[0].play).toHaveBeenCalled();
  });

  it('should stop all sounds and reset currentTime', () => {
    playSound('click');
    audioMocks[0].currentTime = 10;
    stopAllSounds();
    expect(audioMocks[0].pause).toHaveBeenCalled();
    expect(audioMocks[0].currentTime).toBe(0);
  });

  it('should set global volume for cached audios', () => {
    playSound('timer_safe');
    setGlobalVolume(0.3);
    expect(audioMocks[0].volume).toBe(0.3);
  });

  it('should stop a specific sound and reset playback position', () => {
    playSound('correct_answer');
    audioMocks[0].currentTime = 5;

    stopSound('correct_answer');

    expect(audioMocks[0].pause).toHaveBeenCalled();
    expect(audioMocks[0].currentTime).toBe(0);
  });
});
