import {
  Card,
  CardFooter,
  CardHeader,
  Skeleton
} from '@/app/core/shared/components/atoms';
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
}

export const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <Card className="w-full justify-between px-6 py-5">
      <CardHeader className="relative w-full">{icon}</CardHeader>
      <CardFooter className="w-full gap-1 flex-col items-start mt-4">
        <p className="text-sm font-medium text-secondary">{label}</p>
        <h2 className="md:text-2xl text-xl font-semibold">{value}</h2>
      </CardFooter>
    </Card>
  );
};

export const StatCardSkeleton = () => {
  return (
    <Card className="w-full justify-between">
      <CardHeader className="relative">
        <Skeleton className="h-6 w-6 rounded-full" />
      </CardHeader>
      <CardFooter className="w-full gap-[9px] flex-col items-start">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-full" />
      </CardFooter>
    </Card>
  );
};
