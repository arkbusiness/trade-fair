import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  Skeleton
} from '@/app/core/shared/components/atoms';
import { ReactNode } from 'react';
import { cn } from '../../utils';

interface MetricCardProps {
  label: string;
  value: ReactNode;
  info: ReactNode;
  infoClassName?: string;
  icon: ReactNode;
}

export const MetricCard = ({
  label,
  value,
  info,
  infoClassName,
  icon
}: MetricCardProps) => {
  return (
    <Card className="w-full justify-between">
      <CardHeader className="relative">
        <div className="flex justify-between gap-2 items-center">
          <CardDescription className="text-sm font-medium text-secondary">
            {label}
          </CardDescription>
          <div>{icon}</div>
        </div>
      </CardHeader>
      <CardFooter className="w-full gap-[9px] flex-col items-start mt-12">
        <h2 className="text-xl md:text-3xl font-semibold">{value}</h2>
        <div
          className={cn(
            'text-foreground/60 text-[0.75rem] font-normal w-full',
            infoClassName
          )}
        >
          {info}
        </div>
      </CardFooter>
    </Card>
  );
};

export const MetricCardSkeleton = () => {
  return (
    <Card className="w-full justify-between">
      <CardHeader className="relative">
        <div className="flex justify-between gap-2 items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </CardHeader>
      <CardFooter className="w-full gap-[9px] flex-col items-start">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-full" />
      </CardFooter>
    </Card>
  );
};
