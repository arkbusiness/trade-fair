'use client';

import {
  MetricCard,
  MetricCardSkeleton
} from '@/app/core/shared/components/atoms';
import {
  Box,
  Calendar,
  CircleCheckBig,
  CircleX,
  User,
  Users
} from 'lucide-react';
import { useOrganizerOverview } from '../../hooks';

export const OrganizerOverviewStat = () => {
  const { overviewStats, isLoadingOverviewStats, isRefetchingOverviewStats } =
    useOrganizerOverview();
  const isLoading = isLoadingOverviewStats || isRefetchingOverviewStats;

  const { counts } = overviewStats ?? {};
  const diffs = counts?.diffs ?? {
    orders: 0,
    ordersCompleted: 0,
    invitedExhibitors: 0,
    invitedAttendees: 0,
    allAppointments: 0,
    successfulAppointments: 0,
    cancelledAppointments: 0
  };

  const PERFORMANCE_STATS = [
    {
      title: 'Registered Exhibitors/Invited',
      value: `${counts?.registeredExhibitors?.toLocaleString()}/${counts?.invitedExhibitors?.toLocaleString()}`,
      icon: <User className="text-tertiary" />,
      info: (
        <>
          <span className="font-semibold text-[0.81rem] flex items-center">
            <span className="text-green-600 inline-block mr-1">
              +{diffs.invitedExhibitors?.toLocaleString()}
            </span>
            <span>more than yesterday</span>
          </span>
        </>
      )
    },
    {
      title: 'Registered Attendees/Invited',
      value: `${counts?.registeredAttendees?.toLocaleString()}/${counts?.invitedAttendees?.toLocaleString()}`,
      icon: <Users className="text-tertiary" />,
      info: (
        <>
          <span className="font-semibold text-[0.81rem] flex items-center">
            <span className="text-green-600 inline-block mr-1">
              +{diffs.invitedAttendees?.toLocaleString()}
            </span>
            <span>more than yesterday</span>
          </span>
        </>
      )
    },
    {
      title: 'Order Made/Product Sold',
      value: `${counts?.totalOrders?.toLocaleString()}/${counts?.ordersCompleted?.toLocaleString()}`,
      icon: <Box className="text-tertiary" />,
      info: (
        <>
          <span className="font-semibold text-[0.81rem] flex items-center">
            <span className="text-green-600 inline-block mr-1">
              +{(diffs.orders + diffs.ordersCompleted)?.toLocaleString()}
            </span>
            <span>more than yesterday</span>
          </span>
        </>
      )
    }
  ];

  const APPOINTMENT_STATS = [
    {
      title: 'Scheduled Appointments',
      value: counts?.allAppointments?.toLocaleString(),
      icon: <Calendar className="text-light-blue" />,
      info: (
        <>
          <span className="font-semibold text-[0.81rem] flex items-center">
            <span className="text-green-600 inline-block mr-1">
              +{diffs.allAppointments?.toLocaleString()}
            </span>
            <span>more than yesterday</span>
          </span>
        </>
      )
    },
    {
      title: 'Successful Appointments',
      value: `${counts?.successfulAppointments?.toLocaleString()}/${counts?.allAppointments?.toLocaleString()}`,
      icon: <CircleCheckBig className="text-green-600" />,
      info: (
        <>
          <span className="font-semibold text-[0.81rem] flex items-center">
            <span className="text-green-600 inline-block mr-1">
              +{diffs.successfulAppointments?.toLocaleString()}
            </span>
            <span>more than yesterday</span>
          </span>
        </>
      )
    },
    {
      title: 'Cancelled Appointments',
      value: `${counts?.cancelledAppointments?.toLocaleString()}`,
      icon: <CircleX className="text-red-600" />,
      info: (
        <>
          <span className="font-semibold text-[0.81rem] flex items-center">
            <span className="text-green-600 inline-block mr-1">
              +{diffs.cancelledAppointments?.toLocaleString()}
            </span>
            <span>more than yesterday</span>
          </span>
        </>
      )
    }
  ];

  return (
    <>
      {isLoading ? (
        <OrganizerOverviewStatSkeleton />
      ) : (
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(290px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
            {PERFORMANCE_STATS.map((stat) => {
              return (
                <MetricCard
                  key={stat.title}
                  label={stat.title}
                  value={stat.value}
                  icon={
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-accent/60">
                      {stat.icon}
                    </div>
                  }
                  info={stat.info}
                />
              );
            })}
          </div>
          <div>
            <h2 className="text-secondary text-2xl font-medium mb-5">
              Appointment Statistics
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(290px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2 mt-4">
              {APPOINTMENT_STATS.map((stat) => {
                return (
                  <MetricCard
                    key={stat.title}
                    label={stat.title}
                    value={stat.value}
                    icon={
                      <div className="h-12 w-12 rounded-full flex items-center justify-center bg-accent/60">
                        {stat.icon}
                      </div>
                    }
                    info={stat.info}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const OrganizerOverviewStatSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(253px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
      {Array.from({ length: 4 }).map((_, index) => {
        const key = `organizer-overview-stat-${index}`;
        return <MetricCardSkeleton key={key} />;
      })}
    </div>
  );
};
