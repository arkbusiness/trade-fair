'use client';

import { BoxIcon, Calendar, NotebookPen } from 'lucide-react';
import { useExhibitorOverview } from '../../hooks';
import { StatCard, StatCardSkeleton } from '../atoms';

export const ExhibitorOverviewStat = () => {
  const { overviewStats, isLoadingOverviewStats, isRefetchingOverviewStats } =
    useExhibitorOverview();
  const isLoading = isLoadingOverviewStats || isRefetchingOverviewStats;

  const { counts } = overviewStats ?? {
    counts: {
      products: 0,
      appointments: 0,
      invoices: 0
    }
  };

  const STATS = [
    {
      title: 'Total Products',
      value: counts.products.toLocaleString(),
      icon: (
        <div className="w-[2.87rem] h-[2.13rem] rounded-[1.38rem] flex items-center justify-center bg-light-blue/10">
          <BoxIcon className="text-light-blue" size={18} />
        </div>
      )
    },
    {
      title: 'Appointments',
      value: counts.appointments.toLocaleString(),
      icon: (
        <div className="w-[2.87rem] h-[2.13rem] rounded-[1.38rem] flex items-center justify-center bg-purple-primary/10">
          <Calendar className="text-purple-primary" size={18} />
        </div>
      )
    },
    {
      title: 'Total Invoice Request',
      value: counts.invoices.toLocaleString(),
      icon: (
        <div className="w-[2.87rem] h-[2.13rem] rounded-[1.38rem] flex items-center justify-center bg-foreground/10">
          <NotebookPen className="text-foreground" size={18} />
        </div>
      )
    }
  ];

  return (
    <>
      {isLoading ? (
        <OverviewStatSkeleton />
      ) : (
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(290px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
            {STATS.map((stat) => {
              return (
                <StatCard
                  key={stat.title}
                  label={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const OverviewStatSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(253px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
      {Array.from({ length: 4 }).map((_, index) => {
        const key = `overview-stat-${index}`;
        return <StatCardSkeleton key={key} />;
      })}
    </div>
  );
};
