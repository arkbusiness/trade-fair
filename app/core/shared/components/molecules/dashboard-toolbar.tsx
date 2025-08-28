'use client';

import { ReactNode } from 'react';
import { Skeleton } from '../atoms';

interface DashboardToolbarProps {
  description: string | ReactNode;
  title?: string | ReactNode;
  showTitle?: boolean;
  children?: ReactNode;
  userName?: string;
}

export const DashboardToolbar = ({
  description,
  title,
  showTitle = true,
  children,
  userName
}: DashboardToolbarProps) => {
  const renderTitle = () => {
    if (!showTitle) return;
    if (title) return title;
    return `Welcome Back ${userName ?? ''}`;
  };
  return (
    <header className="flex flex-wrap items-center justify-between w-full mt-4 gap-3">
      <div className="text-left w-full sm:w-auto">
        <h2 className="text-[1.13rem] font-bold text-foreground">
          {renderTitle()}
        </h2>
        {description && (
          <div className="text-[0.75rem] mt-[0.78rem]">{description}</div>
        )}
      </div>

      <div>{children && children}</div>
    </header>
  );
};

export const DashboardToolbarSkeleton = () => {
  return (
    <header className="flex flex-wrap items-center justify-between w-full mt-5 gap-3">
      <div className="text-left w-full sm:w-auto">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-64 mt-2" />
      </div>
      <div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </header>
  );
};
