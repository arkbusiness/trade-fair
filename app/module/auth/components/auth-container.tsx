import { cn } from '@/app/core/shared/utils';
import { ReactNode } from 'react';

interface AuthContainerProps {
  children: ReactNode;
  className?: string;
}

export const AuthContainer = ({ children, className }: AuthContainerProps) => {
  return (
    <div className={cn('max-w-[34.75rem] w-full mx-auto relative', className)}>
      {children}
    </div>
  );
};
