/**
 * TrivIAndo Sound System
 * Sistema centralizado para manejo de sonidos en la aplicación
 */

// Tipos de sonidos disponibles
export type SoundType = 'correct' | 'incorrect' | 'excellent' | 'loser' | 'click' | 'hover';

// Configuración de sonidos
const SOUND_CONFIG = {
  baseVolume: 0.7,
  paths: {
    correct: '/sounds/correct.mp3',
    incorrect: '/sounds/incorrect.mp3',
    excellent: '/sounds/excelent.mp3',
    loser: '/sounds/looser.mp3',
    click: '/sounds/click.mp3', 
    hover: '/sounds/hover.mp3',
  },
} as const;

// Cache de audio para mejor rendimiento
const audioCache = new Map<string, HTMLAudioElement>();

/**
 * Carga y cachea un archivo de audio
 */
const loadAudio = (src: string): HTMLAudioElement => {
  if (audioCache.has(src)) {
    return audioCache.get(src)!;
  }

  const audio = new Audio(src);
  audio.volume = SOUND_CONFIG.baseVolume;
  audio.preload = 'auto';
  audioCache.set(src, audio);

  return audio;
};

/**
 * Reproduce un sonido por tipo
 */
export const playSound = (type: SoundType, volume?: number) => {
  try {
    const soundPath = SOUND_CONFIG.paths[type];
    if (!soundPath) {
      console.warn(`Sound type "${type}" not found`);
      return;
    }

    const audio = loadAudio(soundPath);
    if (volume !== undefined) {
      audio.volume = Math.max(0, Math.min(1, volume));
    }

    // Reiniciar el audio si ya está reproduciéndose
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.warn('Error playing sound:', error);
    });
  } catch (error) {
    console.warn('Error in playSound:', error);
  }
};

/**
 * Reproduce un sonido desde una URL personalizada
 */
export const playSoundFromUrl = (src: string, volume = SOUND_CONFIG.baseVolume) => {
  try {
    const audio = loadAudio(src);
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.warn('Error playing custom sound:', error);
    });
  } catch (error) {
    console.warn('Error in playSoundFromUrl:', error);
  }
};

/**
 * Detiene todos los sonidos
 */
export const stopAllSounds = () => {
  audioCache.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
};

/**
 * Configura el volumen global
 */
export const setGlobalVolume = (volume: number) => {
  const clampedVolume = Math.max(0, Math.min(1, volume));
  audioCache.forEach((audio) => {
    audio.volume = clampedVolume;
  });
};

/**
 * Precarga todos los sonidos para mejor rendimiento
 */
export const preloadSounds = () => {
  Object.values(SOUND_CONFIG.paths).forEach((path) => {
    if (path) {
      loadAudio(path);
    }
  });
};

/**
 * Hook para manejar sonidos en componentes React
 */
export const useSounds = () => {
  return {
    playCorrect: () => playSound('correct'),
    playIncorrect: () => playSound('incorrect'),
    playExcellent: () => playSound('excellent'),
    playLoser: () => playSound('loser'),
    playClick: () => playSound('click'),
    playHover: () => playSound('hover'),
    playCustom: playSoundFromUrl,
    stopAll: stopAllSounds,
    setVolume: setGlobalVolume,
  };
};

// Funciones de conveniencia para sonidos específicos de quiz
export const playQuizSounds = {
  correctAnswer: () => playSound('correct'),
  incorrectAnswer: () => playSound('incorrect'),
  quizComplete: () => playSound('excellent'),
  quizFailed: () => playSound('loser'),
};
