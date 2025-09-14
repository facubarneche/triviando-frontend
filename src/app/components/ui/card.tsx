import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/utils';

const cardVariants = cva(
  'rounded-xl border shadow-lg transition-all duration-300 cursor-default text-gray-700',
  {
    variants: {
      variant: {
        // Card con efecto glass - estilo por defecto
        default: 'bg-white/95 backdrop-blur-md border-white/30 hover:shadow-xl',

        // Card sólido para contenido importante
        solid: 'bg-white border-gray-200 hover:shadow-xl',

        // Card con gradiente sutil
        gradient:
          'bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-md border-white/30 hover:shadow-xl',

        // Card destacado
        highlighted:
          'bg-gradient-to-br from-teal-50/95 to-cyan-50/95 backdrop-blur-md border-teal-200/50 hover:shadow-xl hover:border-teal-300/60',

        // Card de éxito
        success:
          'bg-gradient-to-br from-green-50/95 to-emerald-50/95 backdrop-blur-md border-green-200/50 hover:shadow-xl',

        // Card de error
        error:
          'bg-gradient-to-br from-red-50/95 to-pink-50/95 backdrop-blur-md border-red-200/50 hover:shadow-xl',

        // Card de warning
        warning:
          'bg-gradient-to-br from-amber-50/95 to-orange-50/95 backdrop-blur-md border-amber-200/50 hover:shadow-xl',
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, size }),
        hover && 'hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-4 md:p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-tight text-gray-800',
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm md:text-base text-gray-600 leading-relaxed', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-4 md:p-6 pt-0 text-gray-700', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0 text-gray-700', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
