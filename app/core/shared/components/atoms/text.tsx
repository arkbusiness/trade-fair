import { ReactNode } from 'react';
import { cn } from '../../utils';

interface TextProps {
  className?: string;
  children: ReactNode;
}
export const Text = ({ className, children }: TextProps) => (
  <p
    className={cn('text-[0.75rem] font-medium text-text-secondary', className)}
  >
    {children}
  </p>
);
