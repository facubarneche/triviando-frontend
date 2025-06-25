import { getColorAndMessage } from '@/app/(pages)/[username]/results/utils/percentage';

// Mock the Audio API to prevent "Not implemented" errors during tests
beforeAll(() => {
  // @ts-expect-error: Mocking play audio
  global.Audio = class {
    play = jest.fn();
  };
});

describe('getColorAndMessage', () => {
  it('returns correct values for 100%', () => {
    expect(getColorAndMessage(100)).toEqual({
      message: '¡Excelente!',
      color: 'text-green-500',
    });
  });

  it('returns correct values for 90%', () => {
    expect(getColorAndMessage(90)).toEqual({
      message: '¡Muy bien!',
      color: 'text-green-400',
    });
  });

  it('returns correct values for 80%', () => {
    expect(getColorAndMessage(80)).toEqual({
      message: '¡Buen trabajo!',
      color: 'text-blue-500',
    });
  });

  it('returns correct values for 65%', () => {
    expect(getColorAndMessage(65)).toEqual({
      message: '¡Puedes mejorar!',
      color: 'text-yellow-500',
    });
  });

  it('returns correct values for 40%', () => {
    expect(getColorAndMessage(40)).toEqual({
      message: '¡Sigue practicando!',
      color: 'text-orange-500',
    });
  });

  it('returns correct values for 39%', () => {
    expect(getColorAndMessage(39)).toEqual({
      message: '¡Inténtalo de nuevo!',
      color: 'text-red-500',
    });
  });
});
