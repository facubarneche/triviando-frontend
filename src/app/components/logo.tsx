'use client';

import { motion, Variants } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showTagline?: boolean;
}

export default function Logo({ size = 'md', animated = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const sparklesSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const brainVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
      },
    },
  };

  const sparklesVariants: Variants = {
    initial: { opacity: 0.5, scale: 0.8 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={animated ? 'initial' : 'animate'}
      animate="animate"
      variants={logoVariants}
    >
      <div className="flex items-center gap-2 mb-5 mt-10">
        {/* Icono del cerebro con IA */}
        <motion.div
          className="relative"
          variants={animated ? brainVariants : {}}
          initial="initial"
          animate="animate"
        >
          <div className="relative">
            <Brain className={`${iconSizes[size]} text-cyan-600`} />
            {/* Sparkles para representar IA */}
            <motion.div
              className="absolute -top-1 -right-1"
              variants={animated ? sparklesVariants : {}}
              initial="initial"
              animate="animate"
            >
              <Sparkles className={`${sparklesSizes[size]} text-teal-400`} />
            </motion.div>
          </div>
        </motion.div>

        {/* Texto del logo */}
        <div className={`font-bold ${sizeClasses[size]} flex items-baseline`}>
          <span className="text-cyan-700">triv</span>
          <span className="text-teal-500 font-black relative">
            IA
            {/* Pequeño indicador de IA */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
              animate={
                animated
                  ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
              }}
            />
          </span>
          <span className="text-cyan-700">ndo</span>
        </div>
      </div>
    </motion.div>
  );
}
