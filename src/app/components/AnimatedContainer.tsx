/**
 * AnimatedContainer - Wrapper component para animaciones consistentes
 */

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import {
  fadeInVariants,
  slideInFromBottomVariants,
  slideInFromTopVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
  scaleInVariants,
  bounceInVariants,
  staggerContainerVariants,
  pageTransitionVariants,
} from '@/utils/animations';

type AnimationType =
  | 'fade'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'bounce'
  | 'stagger'
  | 'page'
  | 'none';

interface AnimatedContainerProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  customVariants?: Variants;
  className?: string;
  disabled?: boolean;
}

const animationMap: Record<AnimationType, Variants | null> = {
  fade: fadeInVariants,
  slideUp: slideInFromBottomVariants,
  slideDown: slideInFromTopVariants,
  slideLeft: slideInFromRightVariants,
  slideRight: slideInFromLeftVariants,
  scale: scaleInVariants,
  bounce: bounceInVariants,
  stagger: staggerContainerVariants,
  page: pageTransitionVariants,
  none: null,
};

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration,
  customVariants,
  className = '',
  disabled = false,
  ...motionProps
}) => {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants = customVariants || animationMap[animation];

  if (!variants) {
    return <div className={className}>{children}</div>;
  }

  // Crear variantes modificadas si se especifica delay o duration
  const modifiedVariants = { ...variants };
  if (
    (delay > 0 || duration) &&
    modifiedVariants.visible &&
    typeof modifiedVariants.visible === 'object'
  ) {
    const currentVisible = modifiedVariants.visible as Record<string, unknown>;
    const currentTransition = (currentVisible.transition as Record<string, unknown>) || {};
    const transition: Record<string, unknown> = {
      ...currentTransition,
      type: 'tween', // Siempre usar tween para mejor performance
      ease: 'easeInOut',
    };

    if (delay > 0) transition.delay = delay;
    if (duration) transition.duration = duration;

    modifiedVariants.visible = {
      ...currentVisible,
      transition,
    };
  }

  const initialState = animation === 'page' ? 'initial' : 'hidden';
  const animateState = animation === 'page' ? 'in' : 'visible';

  // Agregar clases de optimización automáticamente
  const optimizedClassName = `${className} will-change-transform`.trim();

  return (
    <motion.div
      className={optimizedClassName}
      variants={modifiedVariants}
      initial={initialState}
      animate={animateState}
      exit={animation === 'page' ? 'out' : 'hidden'}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

// Componente especializado para elementos de lista con stagger
interface AnimatedListProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
  ...motionProps
}) => {
  const customStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={customStaggerVariants}
      initial="hidden"
      animate="visible"
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

// Hook para animaciones de hover elegantes sin cambio de tamaño
export const useHoverAnimation = () => {
  return {
    whileHover: {
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      y: -2,
    },
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      type: 'tween', // Más eficiente que spring
    },
  };
};

// Hook para animaciones de botones profesionales
export const useButtonAnimation = () => {
  return {
    whileHover: {
      boxShadow: '0 6px 20px rgba(20, 184, 166, 0.3)',
      y: -1,
    },
    whileTap: { y: 0 },
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
      type: 'tween',
    },
  };
};

// Hook para animaciones de cards elegantes
export const useCardAnimation = () => {
  return {
    whileHover: {
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      y: -2,
    },
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      type: 'tween', // Más eficiente que spring
    },
  };
};

export default AnimatedContainer;
