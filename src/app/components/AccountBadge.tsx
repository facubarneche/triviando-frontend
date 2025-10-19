'use client';

import { Badge } from '@/app/components/ui/badge';
import { Crown, User } from 'lucide-react';
import { cn } from '@/app/utils/utils';

type AccountType = 'FREE' | 'PREMIUM';

interface AccountBadgeProps {
  account: AccountType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

// Configuración modular para diferentes tipos de cuenta
const accountConfig = {
  FREE: {
    label: 'Free',
    icon: User,
    variant: 'outline' as const,
    className: 'border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-100',
  },
  PREMIUM: {
    label: 'Premium',
    icon: Crown,
    variant: 'premium' as const,
    className: 'badge-premium',
  },
} as const;

// Tamaños modulares
const sizeConfig = {
  sm: {
    badge: 'px-2 py-0.5 text-xs',
    icon: 'h-3 w-3',
  },
  md: {
    badge: 'px-2.5 py-0.5 text-xs',
    icon: 'h-3.5 w-3.5',
  },
  lg: {
    badge: 'px-3 py-1 text-sm',
    icon: 'h-4 w-4',
  },
} as const;

export function AccountBadge({
  account,
  size = 'md',
  showIcon = true,
  className,
}: AccountBadgeProps) {
  const config = accountConfig[account];
  const sizeStyles = sizeConfig[size];
  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant} className={cn(config.className, sizeStyles.badge, className)}>
      {showIcon && <IconComponent className={cn(sizeStyles.icon, 'mr-1')} />}
      {config.label}
    </Badge>
  );
}


export default AccountBadge;
