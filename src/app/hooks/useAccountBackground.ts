'use client';

import { AccountOptions, type AccountType } from '@/app/domain/User';
import { useCurrentUser } from '@/app/utils/auth';

interface BackgroundConfig {
  bodyClass: string;
}

// Configuración modular para diferentes tipos de fondo según el account
const backgroundConfig: Record<AccountType, BackgroundConfig> = {
  [AccountOptions.FREE]: {
    bodyClass: 'bg-free-gradient',
  },
  [AccountOptions.PREMIUM]: {
    bodyClass: 'bg-premium-gradient',
  },
} as const;

/**
 * Hook personalizado que retorna las clases CSS apropiadas según el tipo de cuenta del usuario
 */
export function useAccountBackground() {
  const user = useCurrentUser();

  const accountType: AccountType = user?.account || AccountOptions.FREE;
  const config = backgroundConfig[accountType];

  return {
    accountType,
    bodyClass: config.bodyClass,
    isPremium: accountType === AccountOptions.PREMIUM,
    isFree: accountType === AccountOptions.FREE,
  };
}

/**
 * Función helper que retorna las clases para aplicar al body
 */
export function getBodyClassForAccount(account?: AccountType): string {
  if (!account) return backgroundConfig[AccountOptions.FREE].bodyClass;
  return backgroundConfig[account].bodyClass;
}

export default useAccountBackground;
