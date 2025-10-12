'use client';

import { useCurrentUser } from '@/app/utils/auth';

type AccountType = 'FREE' | 'PREMIUM';

interface BackgroundConfig {
  bodyClass: string;
}

// Configuración modular para diferentes tipos de fondo según el account
const backgroundConfig: Record<AccountType, BackgroundConfig> = {
  FREE: {
    bodyClass: 'bg-free-gradient',
  },
  PREMIUM: {
    bodyClass: 'bg-premium-gradient',
  },
} as const;

/**
 * Hook personalizado que retorna las clases CSS apropiadas según el tipo de cuenta del usuario
 */
export function useAccountBackground() {
  const user = useCurrentUser();

  const accountType: AccountType = user?.account || 'FREE';
  const config = backgroundConfig[accountType];

  return {
    accountType,
    bodyClass: config.bodyClass,
    isPremium: accountType === 'PREMIUM',
    isFree: accountType === 'FREE',
  };
}

/**
 * Función helper que retorna las clases para aplicar al body
 */
export function getBodyClassForAccount(account?: AccountType): string {
  if (!account) return backgroundConfig.FREE.bodyClass;
  return backgroundConfig[account].bodyClass;
}

export default useAccountBackground;
