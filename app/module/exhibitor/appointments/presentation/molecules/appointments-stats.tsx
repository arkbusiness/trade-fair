'use client';

import {
  Card,
  CardFooter,
  CardHeader,
  Skeleton
} from '@/app/core/shared/components/atoms';
import { Calendar, Check, Clock6, Users, X } from 'lucide-react';
import { useAppointmentsStats } from '../../hooks';

export const AppointmentsStat = () => {
  const { appointmentsStats, isLoadingAppointmentsStats } =
    useAppointmentsStats();

  const {
    availableCount,
    bookedCount,
    waitlistedCount,
    cancelledCount,
    completedCount
  } = appointmentsStats ?? {
    availableCount: 0,
    bookedCount: 0,
    waitlistedCount: 0,
    cancelledCount: 0,
    completedCount: 0
  };

  const totalAppointments =
    availableCount +
    bookedCount +
    waitlistedCount +
    cancelledCount +
    completedCount;

  const STATS = [
    {
      title: 'Total Appointments',
      value: totalAppointments?.toLocaleString() || 0,
      icon: (
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center bg-[#D3A32B] text-background">
          <Users size={16} />
        </div>
      )
    },
    {
      title: 'Booked',
      value: bookedCount?.toLocaleString() || 0,
      icon: (
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center bg-green-600 text-background">
          <Check size={16} />
        </div>
      )
    },
    {
      title: 'Cancelled',
      value: cancelledCount?.toLocaleString() || 0,
      icon: (
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center bg-red-600 text-background">
          <X size={16} />
        </div>
      )
    },
    {
      title: 'Completed',
      value: completedCount?.toLocaleString() || 0,
      icon: (
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center bg-blue-500 text-background">
          <Calendar size={16} />
        </div>
      )
    },
    {
      title: 'Waitlisted',
      value: waitlistedCount?.toLocaleString() || 0,
      icon: (
        <div className="w-6 h-6 rounded-[4px] flex items-center justify-center bg-gray-500 text-background">
          <Clock6 size={16} />
        </div>
      )
    }
  ];

  return (
    <>
      {isLoadingAppointmentsStats ? (
        <AppointmentsStatSkeleton />
      ) : (
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
            {STATS.map((stat) => {
              return (
                <Card
                  key={stat.title}
                  className="w-full justify-between px-5 py-6 bg-gray-light-4"
                >
                  <div className="flex gap-3 items-center">
                    <span>{stat.icon}</span>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {stat.title}
                      </p>
                      <h2 className="text-lg font-semibold">{stat.value}</h2>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const AppointmentsStatSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(253px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
      {Array.from({ length: 4 }).map((_, index) => {
        const key = `orders-stat-${index}`;
        return (
          <Card key={key} className="w-full justify-between">
            <CardHeader className="relative">
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardHeader>
            <CardFooter className="w-full gap-[9px] flex-col items-start">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-full" />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
