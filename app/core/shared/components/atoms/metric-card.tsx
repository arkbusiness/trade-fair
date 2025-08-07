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
  title: string;
  value: ReactNode;
  description: ReactNode;
  descriptionClassName?: string;
  icon: ReactNode;
}

export const MetricCard = ({
  title,
  value,
  description,
  descriptionClassName,
  icon
}: MetricCardProps) => {
  return (
    <Card className="w-full justify-between">
      <CardHeader className="relative">
        <div className="flex justify-between gap-2 items-center">
          <CardDescription className="text-base text-primary font-medium">
            {title}
          </CardDescription>
          <div>{icon}</div>
        </div>
      </CardHeader>
      <CardFooter className="w-full gap-[9px] flex-col items-start">
        <h2 className="@[250px]/card:text-2xl text-xl tabular-nums font-extrabold">
          {value}
        </h2>
        <div
          className={cn(
            'text-foreground/60 text-[0.75rem] font-normal w-full',
            descriptionClassName
          )}
        >
          {description}
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
