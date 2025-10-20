'use client';

import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { DEFAULT_LIMIT_MESSAGES } from '@/app/utils/planLimitErrors';
import { formatPremiumPrice, getPremiumBillingPeriodLabel } from '@/app/utils/premiumPricing';
import AccountBadge from '@/app/components/AccountBadge';
import { Zap, Crown, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '@/app/utils/utils';
import {
  getCardClasses,
  getGlassClasses,
  getPrimaryButtonClasses,
  getSecondaryButtonClasses,
} from '@/utils/designSystem';

const QUESTION_BENEFITS = [
  { icon: Zap, label: 'Preguntas ilimitadas' },
  { icon: Crown, label: 'Temas ilimitados' },
  { icon: Sparkles, label: 'Sin restricciones' },
];

interface QuestionLimitModalProps {
  open: boolean;
  onClose: () => void;
  onKeepPracticing?: () => void;
  message?: string | null;
}

export function QuestionLimitModal({
  open,
  onClose,
  onKeepPracticing,
  message,
}: QuestionLimitModalProps) {
  const handleOpenChange = (value: boolean) => {
    if (!value) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn(getGlassClasses(), 'sm:max-w-lg p-0')}>
        <DialogHeader className="items-center gap-3 px-6 pt-8 sm:text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-100 bg-white shadow-sm">
            <AlertCircle className="h-8 w-8 text-amber-500" />
          </div>

          <DialogTitle className="text-2xl font-semibold text-slate-800">
            ¡A seguir aprendiendo!
          </DialogTitle>
          <DialogDescription className="text-base text-slate-600">
            {message || DEFAULT_LIMIT_MESSAGES.questions}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-0">
          <div className="grid gap-3 pb-6 pt-4 sm:grid-cols-3">
            {QUESTION_BENEFITS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className={cn(
                  getCardClasses(),
                  'flex flex-col items-center gap-2 rounded-xl border border-white/40 bg-white/90 p-4 text-center shadow-sm hover:-translate-y-1 hover:shadow-md',
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                  <Icon className="h-5 w-5 text-teal-500" />
                </div>
                <span className="text-xs font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            getCardClasses(),
            'mx-6 mb-6 flex items-center justify-between gap-4 rounded-xl p-4',
          )}
        >
          <div>
            <p className="text-sm font-medium text-slate-600">Plan Premium</p>
            <p className="text-2xl font-semibold text-slate-800">
              {formatPremiumPrice()}
              <span className="ml-1 text-sm font-normal text-slate-500">
                {getPremiumBillingPeriodLabel()}
              </span>
            </p>
          </div>
          <AccountBadge account="PREMIUM" size="sm" />
        </div>

        <div className="flex flex-col gap-3 px-6 pb-8">
          <Button
            asChild
            className={cn(getPrimaryButtonClasses(), 'w-full justify-center gap-2 rounded-xl')}
          >
            <Link href="/payment" className="flex items-center justify-center gap-2">
              Desbloquear Premium
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              onKeepPracticing?.();
            }}
            className={cn(
              getSecondaryButtonClasses(),
              'w-full justify-center rounded-xl text-slate-700',
            )}
          >
            Volver a Temas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default QuestionLimitModal;
