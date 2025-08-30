'use client';

import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { SlotStatus, useAppointmentSlot } from '../../hooks';
import { AppointmentItem } from '../molecules';
import { AppointmentsTabs } from './appointments-tabs';
import { Spinner } from '@/app/core/shared/components/atoms';

export const APPOINTMENT_STATUS_MAP = {
  [SlotStatus.AVAILABLE]: {
    label: 'Available',
    style: {
      bg: 'bg-yellow-500',
      text: 'text-white'
    }
  },
  [SlotStatus.BOOKED]: {
    label: 'Booked',
    style: {
      bg: 'bg-green-600',
      text: 'text-white'
    }
  },
  [SlotStatus.CANCELLED]: {
    label: 'Cancelled',
    style: {
      bg: 'bg-red-600',
      text: 'text-white'
    }
  },
  [SlotStatus.COMPLETED]: {
    label: 'Completed',
    style: {
      bg: 'bg-blue-600',
      text: 'text-white'
    }
  },
  [SlotStatus.WAITLISTED]: {
    label: 'Waitlist',
    style: {
      bg: 'bg-gray-500',
      text: 'text-white'
    }
  }
};

const LIMIT = 5;

export const AppointmentItems = () => {
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const { slots, isLoadingAppointments, paginationMeta } = useAppointmentSlot({
    ...searchParamsObject,
    page: searchParamsObject.page ?? '1',
    limit: LIMIT.toString()
  });

  const { page, total, pages: pagecount } = paginationMeta;

  const appointments = slots;

  const handlePageClick = (value: { selected: number }) => {
    const newPage = value.selected + 1;
    const newFilter = {
      ...searchParamsObject,
      page: newPage.toString()
    };
    setMultipleParam(newFilter);
    window?.scrollTo({ top: 20, behavior: 'smooth' });
  };

  return (
    <>
      <AppointmentsTabs
        totalAppointments={total}
        isLoading={isLoadingAppointments}
      />
      {isLoadingAppointments && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Spinner />
        </div>
      )}
      {!isLoadingAppointments && appointments && appointments?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-gray-500 text-lg">No appointments found</p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
        <div className="flex justify-center mt-5">
          <Pagination
            page={page}
            pageCount={pagecount}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
    </>
  );
};
