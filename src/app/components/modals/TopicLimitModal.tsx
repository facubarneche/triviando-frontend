'use client';

import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { DEFAULT_LIMIT_MESSAGES } from '@/app/utils/planLimitErrors';
import { formatPremiumPrice, getPremiumBillingPeriodLabel } from '@/app/utils/premiumPricing';
import AccountBadge from '@/app/components/AccountBadge';
import { FolderPlus, Zap, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/app/utils/utils';
import {
  getGlassClasses,
  getPrimaryButtonClasses,
  getSecondaryButtonClasses,
} from '@/utils/designSystem';

const TOPIC_BENEFITS = [
  { icon: FolderPlus, label: 'Temas ilimitados' },
  { icon: Zap, label: 'Preguntas ilimitadas' },
  { icon: Sparkles, label: 'Contenido exclusivo' },
];

interface TopicLimitModalProps {
  open: boolean;
  onClose: () => void;
  message?: string | null;
}

export function TopicLimitModal({ open, onClose, message }: TopicLimitModalProps) {
  const handleOpenChange = (value: boolean) => {
    if (!value) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn(getGlassClasses(), 'max-w-sm p-0 sm:max-w-lg')}>
        <DialogHeader className="items-center gap-2 px-5 pt-6 text-center sm:gap-3 sm:px-6 sm:pt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-100 bg-white shadow-sm sm:h-16 sm:w-16">
            <Lock className="h-6 w-6 text-teal-500 sm:h-8 sm:w-8" />
          </div>

          <DialogTitle className="text-xl font-semibold text-slate-800 sm:text-2xl">
            Límite de Temas Alcanzado
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 sm:text-base">
            {message || DEFAULT_LIMIT_MESSAGES.topics}
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 pb-0 sm:px-6">
          <div className="grid gap-2 pb-5 pt-4 sm:grid-cols-3 sm:gap-3">
            {TOPIC_BENEFITS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className={cn(
                  getGlassClasses(),
                  'flex flex-col items-center gap-2 rounded-lg border border-white/40 bg-white/90 p-3 text-center shadow-sm sm:rounded-xl sm:p-4',
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 text-teal-500 sm:h-5 sm:w-5" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 sm:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            getGlassClasses(),
            'mx-5 mb-5 flex items-center justify-between gap-3 rounded-lg p-4 shadow-md sm:mx-6 sm:mb-6 sm:gap-4 sm:rounded-xl',
          )}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-teal-600 sm:text-sm">
              Plan Premium
            </p>
            <p className="text-xl font-semibold text-slate-800 sm:text-2xl">
              {formatPremiumPrice()}
              <span className="ml-1 text-xs font-normal text-slate-500 sm:text-sm">
                {getPremiumBillingPeriodLabel()}
              </span>
            </p>
          </div>
          <AccountBadge account="PREMIUM" size="sm" />
        </div>

        <div className="flex flex-col gap-2 px-5 pb-6 sm:gap-3 sm:px-6 sm:pb-8">
          <Button
            asChild
            className={cn(
              getPrimaryButtonClasses(),
              'w-full justify-center gap-2 rounded-lg py-2 sm:rounded-xl',
            )}
          >
            <Link href="/payment" className="flex items-center justify-center gap-2">
              Actualizar a Premium
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className={cn(
              getSecondaryButtonClasses(),
              'w-full justify-center rounded-lg text-slate-700 sm:rounded-xl',
            )}
          >
            Seguir explorando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TopicLimitModal;
