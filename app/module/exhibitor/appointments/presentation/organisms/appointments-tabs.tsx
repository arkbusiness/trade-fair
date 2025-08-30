'use client';

import { BorderTab } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { SlotStatus, useAppointmentsStats } from '../../hooks';

enum AppointmentStatusEnum {
  ALL = 'all',
  TODAY = 'today',
  CANCELLED = SlotStatus.CANCELLED,
  COMPLETED = SlotStatus.COMPLETED,
  WAITLIST = SlotStatus.WAITLISTED
}

interface AppointmentsTabsProps {
  totalAppointments: number;
}

export const AppointmentsTabs = ({
  totalAppointments
}: AppointmentsTabsProps) => {
  const { searchParamsObject, setMultipleParam } = useSetParams();
  const { appointmentsStats } = useAppointmentsStats();

  const isToday = searchParamsObject?.today;
  const status =
    searchParamsObject?.status ??
    (isToday ? AppointmentStatusEnum.TODAY : AppointmentStatusEnum.ALL);

  const handleTabChange = (value: string) => {
    if (value !== AppointmentStatusEnum.ALL) {
      if (value !== AppointmentStatusEnum.TODAY) {
        setMultipleParam({
          status: value,
          today: '',
          page: '1'
        });
      } else {
        setMultipleParam({
          today: 'true',
          status: '',
          page: '1'
        });
      }
    } else {
      setMultipleParam({
        status: '',
        today: '',
        page: '1'
      });
    }
  };

  const APPOINTMENT_TAB_LIST = [
    {
      label: 'All Appointments',
      value: AppointmentStatusEnum.ALL,
      count: totalAppointments
    },
    {
      label: 'Today',
      value: AppointmentStatusEnum.TODAY,
      count: isToday ? totalAppointments : undefined
    },
    {
      label: 'Cancelled',
      value: AppointmentStatusEnum.CANCELLED,
      count: appointmentsStats?.cancelledCount ?? 0
    },
    {
      label: 'Completed',
      value: AppointmentStatusEnum.COMPLETED,
      count: appointmentsStats?.completedCount ?? 0
    },
    {
      label: 'Waitlist',
      value: AppointmentStatusEnum.WAITLIST,
      count: appointmentsStats?.waitlistedCount ?? 0
    }
  ];

  return (
    <>
      <div className="flex justify-between gap-x-8 gap-y-5 items-center flex-wrap w-full">
        <BorderTab
          tabs={APPOINTMENT_TAB_LIST}
          defaultValue={status}
          showCount
          selectedValue={status}
          handleSelectedTab={(tab) => {
            handleTabChange(tab.value);
          }}
        />
      </div>
    </>
  );
};
