/**
 * TrivIAndo Animation System
 * Sistema unificado de animaciones para toda la aplicación
 */

import { Variants } from 'framer-motion';

// ===== CONFIGURACIONES BASE =====
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
  },
} as const;

// ===== ANIMACIONES DE ENTRADA =====
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const slideInFromBottomVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const slideInFromTopVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const slideInFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const slideInFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.bounce },
  },
};

export const bounceInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: ANIMATION_CONFIG.duration.slow, ease: ANIMATION_CONFIG.ease.bounce },
  },
};

// ===== ANIMACIONES DE SALIDA =====
export const fadeOutVariants: Variants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const slideOutToBottomVariants: Variants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: 50,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const scaleOutVariants: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// ===== ANIMACIONES DE HOVER ADAPTATIVAS =====
export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02, // Más sutil para mobile
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const hoverBounceVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05, // Menos agresivo para mobile
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.bounce },
  },
};

export const hoverGlowVariants: Variants = {
  rest: {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    boxShadow: '0 10px 25px rgba(20, 184, 166, 0.2)',
    y: -2,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// Mobile-friendly touch animations
export const touchFeedbackVariants: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// ===== ANIMACIONES DE LISTA =====
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// ===== ANIMACIONES DE MODAL =====
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.bounce },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// ===== ANIMACIONES DE CARGA =====
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

export const spinVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const loadingDotsVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
  },
};

// ===== ANIMACIONES DE PÁGINA =====
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, x: 50 },
  in: {
    opacity: 1,
    x: 0,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
  out: {
    opacity: 0,
    x: -50,
    transition: { duration: ANIMATION_CONFIG.duration.fast, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// ===== ANIMACIONES ESPECÍFICAS DE TRIVIANDO =====
export const quizCardVariants: Variants = {
  hidden: { opacity: 0, rotateY: -90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: ANIMATION_CONFIG.duration.slow, ease: ANIMATION_CONFIG.ease.bounce },
  },
  exit: {
    opacity: 0,
    rotateY: 90,
    transition: { duration: ANIMATION_CONFIG.duration.normal, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const scoreCounterVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15,
      delay: 0.2,
    },
  },
};

export const correctAnswerVariants: Variants = {
  correct: {
    backgroundColor: [
      'rgba(16, 185, 129, 0.1)',
      'rgba(16, 185, 129, 0.3)',
      'rgba(16, 185, 129, 0.1)',
    ],
    scale: [1, 1.02, 1],
    transition: { duration: 0.6, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const incorrectAnswerVariants: Variants = {
  incorrect: {
    backgroundColor: ['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.1)'],
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.6, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

// ===== HELPERS =====
export const getRandomEntranceVariant = () => {
  const variants = [
    slideInFromBottomVariants,
    slideInFromTopVariants,
    slideInFromLeftVariants,
    slideInFromRightVariants,
    scaleInVariants,
    bounceInVariants,
  ];
  return variants[Math.floor(Math.random() * variants.length)];
};

export const createDelayedVariant = (baseVariant: Variants, delay: number): Variants => {
  const delayed = { ...baseVariant };
  if (delayed.visible && typeof delayed.visible === 'object' && 'transition' in delayed.visible) {
    delayed.visible = {
      ...delayed.visible,
      transition: {
        ...delayed.visible.transition,
        delay,
      },
    };
  }
  return delayed;
};
