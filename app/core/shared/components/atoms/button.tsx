import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const buttonVariants = cva(
  "h-[2.5rem] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.25rem] text-xs font-medium transition-all disabled:opacity-80 disabled:border disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        tertiary:
          'shadow-xs bg-tertiary hover:bg-tertiary/80 text-primary-foreground',
        highlight: 'shadow-xs bg-highlight hover:bg-tertiary/10 text-tertiary',
        highlight_2:
          'shadow-xs bg-green-100 hover:bg-green-100/80 text-green-600',
        success:
          'shadow-xs bg-green-600 hover:bg-green-500 text-primary-foreground',
        warning:
          'shadow-xs bg-golden-yellow hover:bg-golden-yellow/80 text-primary-foreground',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-background shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'px-4 py-2 has-[>svg]:px-3',
        sm: 'rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        'cursor-pointer'
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
