'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { Calendar } from 'lucide-react';
import { IAttendeeMeeting } from '../../api';
import { AttendeeMeetingItem } from '../molecules';

interface AttendeeMeetingsItemsProps {
  appointments: IAttendeeMeeting[];
  isLoading: boolean;
  pageCount: number;
  page: number;
}

export const AttendeeMeetingsItems = ({
  appointments,
  isLoading,
  pageCount,
  page
}: AttendeeMeetingsItemsProps) => {
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const hasAppointments = appointments?.length > 0;

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
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Spinner />
        </div>
      )}
      {!isLoading && !hasAppointments && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No meetings
          </h3>
          <p className="text-gray-500 text-sm max-w-sm">
            You don&apos;t have any meetings yet. Check back later or browse
            exhibitors to schedule new appointments.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {appointments.map((appointment) => (
          <AttendeeMeetingItem key={appointment.id} appointment={appointment} />
        ))}
        <div className="flex justify-center mt-5">
          <Pagination
            page={page}
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
    </>
  );
};
