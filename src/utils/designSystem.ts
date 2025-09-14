/**
 * TrivIAndo Design System
 * Constantes centralizadas para mantener consistencia visual en toda la aplicación
 */

// ===== COLORES =====
export const COLORS = {
  // Colores principales de la marca
  brand: {
    teal: '#14b8a6',
    cyan: '#06b6d4',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
  },

  // Estados
  states: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },

  // Escalas de grises
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
} as const;

// ===== ESPACIADO =====
export const SPACING = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
} as const;

// ===== TIPOGRAFÍA =====
export const TYPOGRAPHY = {
  fontFamily: {
    primary:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Consolas, 'Liberation Mono', Menlo, monospace",
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// ===== SOMBRAS =====
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glow: '0 0 20px rgb(20 184 166 / 0.3)',
} as const;

// ===== BORDER RADIUS =====
export const BORDER_RADIUS = {
  sm: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px',
} as const;

// ===== BREAKPOINTS =====
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ===== Z-INDEX =====
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// ===== DURACIÓN DE TRANSICIONES =====
export const TRANSITION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;

// ===== EASING =====
export const EASING = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ===== HELPER FUNCTIONS =====
export const getGradientClasses = () => 'bg-gradient-to-br from-teal-500 to-cyan-500';

export const getPrimaryButtonClasses = () =>
  'bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation';

export const getSecondaryButtonClasses = () =>
  'bg-white/90 backdrop-blur-sm text-gray-800 border border-white/20 hover:bg-white hover:border-white/40 transition-all duration-300 shadow-md hover:shadow-lg touch-manipulation';

export const getCardClasses = () =>
  'bg-white/95 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1';

export const getGlassClasses = () => 'bg-white/95 backdrop-blur-md border border-white/30';

// Mobile-specific helpers
export const getMobileButtonClasses = () => 'min-h-[44px] px-4 py-3 text-base'; // 44px is the minimum touch target size

export const getMobileCardClasses = () => 'p-4 rounded-lg'; // Simpler styling for mobile

export const getResponsiveTextClasses = () => 'text-sm md:text-base lg:text-lg';

// Text color helpers that adapt to background
export const getAdaptiveTextClasses = (isDark = false) => (isDark ? 'text-white' : 'text-gray-800');

export const getAdaptiveSecondaryTextClasses = (isDark = false) =>
  isDark ? 'text-white/80' : 'text-gray-600';
