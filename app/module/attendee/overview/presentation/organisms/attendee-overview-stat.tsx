'use client';

import {
  BagOrdersIcon,
  CalenderDividerIcon,
  Card,
  CardDescription,
  CardHeader,
  FavouriteIcon,
  InvoiceIcon,
  MetricCardSkeleton
} from '@/app/core/shared/components/atoms';
import { useAttendeeOverview } from '../../hooks';

export const AttendeeOverviewStat = () => {
  const { overviewStats, isLoadingOverviewStats, isRefetchingOverviewStats } =
    useAttendeeOverview();
  const isLoading = isLoadingOverviewStats || isRefetchingOverviewStats;

  const {
    ordersCount,
    appointments,
    exhibitorFav,
    ordersInvoiceRequestedCount
  } = overviewStats ?? {};

  const STATS = [
    {
      title: 'My Orders',
      value: `${ordersCount?.toLocaleString()}`,
      icon: <BagOrdersIcon />
    },
    {
      title: 'Appointments',
      value: `${appointments?.toLocaleString()}`,
      icon: <CalenderDividerIcon />
    },
    {
      title: 'Favourite Exhibitors',
      value: `${exhibitorFav?.toLocaleString()}`,
      icon: <FavouriteIcon />
    },
    {
      title: 'Invoice Received',
      value: `${ordersInvoiceRequestedCount?.toLocaleString()}`,
      icon: <InvoiceIcon />
    }
  ];

  return (
    <>
      {isLoading ? (
        <AttendeeOverviewStatSkeleton />
      ) : (
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(290px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
            {STATS.map((stat) => {
              return (
                <Card className="w-full justify-between" key={stat.title}>
                  <CardHeader className="relative px-6">
                    <div className="flex flex-col gap-2">
                      <div className="mb-4">{stat.icon}</div>
                      <CardDescription className="text-sm font-medium text-secondary">
                        {stat.title}
                      </CardDescription>
                      <h2 className="text-[1.5rem] font-semibold">
                        {stat.value}
                      </h2>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const AttendeeOverviewStatSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(253px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
      {Array.from({ length: 4 }).map((_, index) => {
        const key = `attendee-overview-stat-${index}`;
        return <MetricCardSkeleton key={key} />;
      })}
    </div>
  );
};
