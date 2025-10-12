import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/app/utils/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        premium:
          'relative overflow-hidden border border-amber-200 bg-gradient-to-r from-[#f7e7b7] via-[#f3d48a] to-[#e8b75f] text-[#4a3510] shadow-[0_0_14px_rgba(240,196,119,0.35)] hover:from-[#f9edc4] hover:via-[#f5d99b] hover:to-[#e7ba63] hover:shadow-[0_0_18px_rgba(244,206,132,0.45)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
