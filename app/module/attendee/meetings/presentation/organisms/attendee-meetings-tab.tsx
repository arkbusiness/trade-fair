'use client';

import { BorderTab } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { SlotStatus } from '@/app/module/exhibitor/appointments/hooks';

enum AppointmentStatusEnum {
  ALL = 'ALL',
  AVAILABLE = SlotStatus.AVAILABLE,
  COMPLETED = SlotStatus.COMPLETED,
  WAITLIST = SlotStatus.WAITLISTED,
  BOOKED = SlotStatus.BOOKED
}

interface AttendeeMeetingsTabProps {
  isLoading: boolean;
  totalAppointments: number;
}

export const AttendeeMeetingsTab = ({
  totalAppointments,
  isLoading
}: AttendeeMeetingsTabProps) => {
  const { searchParamsObject, setMultipleParam } = useSetParams();

  const status = searchParamsObject?.status ?? AppointmentStatusEnum.ALL;
  const isAll = status === AppointmentStatusEnum.ALL;
  const isWaitlist = status === AppointmentStatusEnum.WAITLIST;
  const isBooked = status === AppointmentStatusEnum.BOOKED;
  const isCompleted = status === AppointmentStatusEnum.COMPLETED;

  const handleTabChange = (value: string) => {
    switch (value) {
      case AppointmentStatusEnum.ALL:
        setMultipleParam({
          status: '',
          page: '1'
        });
        break;
      default:
        setMultipleParam({
          status: value,
          page: '1'
        });
        break;
    }
  };

  const APPOINTMENT_TAB_LIST = [
    {
      label: 'All Meetings',
      value: AppointmentStatusEnum.ALL,
      count: isAll && !isLoading ? totalAppointments : undefined
    },
    {
      label: 'Booked',
      value: AppointmentStatusEnum.BOOKED,
      count: isBooked && !isLoading ? totalAppointments : undefined
    },

    {
      label: 'Completed',
      value: AppointmentStatusEnum.COMPLETED,
      count: isCompleted && !isLoading ? totalAppointments : undefined
    },
    {
      label: 'Waitlist',
      value: AppointmentStatusEnum.WAITLIST,
      count: isWaitlist && !isLoading ? totalAppointments : undefined
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
