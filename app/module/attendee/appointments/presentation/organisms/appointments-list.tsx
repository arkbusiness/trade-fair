'use client';

import { Button, Spinner } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { useState } from 'react';
import { IAttendeeMeeting } from '../../../meetings/api';
import {
  attendeeAppointmentSlotsQueryKeys,
  useAttendeeAppointmentsSlots
} from '../../api';
import {
  AppointmentsListItem,
  AttendeeBookAppointment,
  AttendeeJoinWaitlist
} from '../molecules';
import { X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
interface AppointmentsListProps {
  exhibitorId: string;
}

export const AppointmentsList = ({ exhibitorId }: AppointmentsListProps) => {
  const queryClient = useQueryClient();
  const [selectedSlot, setSelectedSlot] = useState<IAttendeeMeeting | null>(
    null
  );
  const { searchParamsObject, setMultipleParam } = useSetParams();
  const exhibitorQuery = {
    date: searchParamsObject.date,
    page: searchParamsObject.page || '1'
  };
  const { slots, isLoadingSlots, isRefetchingSlots, paginationMeta } =
    useAttendeeAppointmentsSlots({
      exhibitorId,
      filter: exhibitorQuery
    });

  const handleCloseModal = () => {
    if (isLoadingSlots) return;
    setSelectedSlot(null);
  };

  const handlePageClick = (value: { selected: number }) => {
    const newPage = value.selected + 1;
    const newFilter = {
      ...searchParamsObject,
      page: newPage.toString()
    };
    setMultipleParam(newFilter);
  };

  const handleClearFilters = () => {
    const filters = {
      page: '',
      date: ''
    };

    setMultipleParam({
      ...filters
    });

    queryClient.invalidateQueries({
      queryKey: [attendeeAppointmentSlotsQueryKeys.base]
    });
  };

  const handleRefetchSlots = () => {
    handleClearFilters();
  };

  const isLoading = isLoadingSlots || isRefetchingSlots;
  const hasSlots = slots.length > 0;
  const showPagination = paginationMeta.pages > 1 && !isLoading;
  const hasActiveFilters = searchParamsObject.date;

  return (
    <div>
      <div className="flex justify-end">
        {hasActiveFilters && (
          <div className="mb-4 flex justify-center">
            <Button variant="secondary" onClick={handleClearFilters}>
              <X size={20} />
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <AttendeeBookAppointment
        isOpen={!!selectedSlot}
        selectedSlot={selectedSlot || null}
        refetchSlots={handleRefetchSlots}
        onClose={handleCloseModal}
      />

      <AttendeeJoinWaitlist
        isLoadingSlots={isLoadingSlots}
        hasSlots={hasSlots}
        exhibitorId={exhibitorId}
      />

      {isLoading && <Spinner />}

      <div className="mb-3">
        {hasSlots && !isLoading && (
          <div className="text-center">
            <h2 className="font-semibold text-secondary">
              Choose available meeting time
            </h2>
            <p className="text-secondary mt-1">
              Click on any available slot to book your meeting
            </p>
          </div>
        )}
      </div>

      {!isLoading && hasSlots && (
        <div className="flex flex-col gap-2">
          {slots.map((slot) => (
            <AppointmentsListItem
              key={slot.id}
              appointment={slot}
              onClick={() => {
                setSelectedSlot(slot);
              }}
            />
          ))}
        </div>
      )}

      {showPagination && (
        <div className="flex justify-center mt-10">
          <Pagination
            page={paginationMeta.page}
            pageCount={paginationMeta.pages}
            handlePageClick={handlePageClick}
          />
        </div>
      )}
    </div>
  );
};
