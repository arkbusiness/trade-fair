import { ReactNode } from 'react';
import { cn } from '@/app/core/shared/utils';

interface LabelValueCardProps {
  label: string;
  value: string | ReactNode;
  labelClassName?: string;
}

export const LabelValueCard = ({
  label,
  value,
  labelClassName
}: LabelValueCardProps) => {
  return (
    <div className="flex flex-col">
      <h4 className={cn('text-sm font-medium text-foreground', labelClassName)}>
        {label}
      </h4>
      <div className="text-xs font-medium mt-1.5">{value}</div>
    </div>
  );
};
