'use client';

import { useAttendeeAppointmentsSlots } from '../../api';
import { useSetParams } from '@/app/core/shared/hooks';
import { AppointmentsListItem } from '../molecules';
import { Spinner, Button } from '@/app/core/shared/components/atoms';
import { Pagination } from '@/app/core/shared/components/molecules';

interface AppointmentsListProps {
  exhibitorId: string;
}

export const AppointmentsList = ({ exhibitorId }: AppointmentsListProps) => {
  const { searchParamsObject, setMultipleParam } = useSetParams();
  const exhibitorQuery = {
    date: searchParamsObject.date,
    page: searchParamsObject.page || '1'
  };
  const {
    slots,
    isLoadingSlots,
    isRefetchingSlots,
    refetchSlots,
    paginationMeta
  } = useAttendeeAppointmentsSlots({
    exhibitorId,
    filter: exhibitorQuery
  });

  const handleJoinWaitlist = () => {
    // TODO: Implement waitlist functionality
    refetchSlots();
  };

  const handlePageClick = (value: { selected: number }) => {
    const newPage = value.selected + 1;
    const newFilter = {
      ...searchParamsObject,
      page: newPage.toString()
    };
    setMultipleParam(newFilter);
  };

  const isLoading = isLoadingSlots || isRefetchingSlots;
  const hasSlots = slots.length > 0;
  const showPagination = paginationMeta.pages > 1;

  return (
    <div>
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
              onClick={() => {}}
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

      {!isLoading && !hasSlots && (
        <div className="text-center py-8">
          <div className="mb-4">
            <p className="mb-2 text-lg text-foreground font-semibold">
              No available meeting slots at this time
            </p>
            <p className="text-secondary">
              Join the waitlist to be notified when new slots become available
            </p>
          </div>
          <Button
            variant="tertiary"
            onClick={handleJoinWaitlist}
            className="px-6"
          >
            Join Waitlist
          </Button>
        </div>
      )}
    </div>
  );
};
