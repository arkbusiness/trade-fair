'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { formatDate } from '@/app/core/shared/lib';
import { errorHandler } from '@/app/core/shared/utils';
import toast from 'react-hot-toast';
import { IAttendeeMeeting } from '../../../meetings/api';
import { useAttendeeBookAppointment } from '../../api';

interface AttendeeBookAppointmentProps {
  isOpen: boolean;
  selectedSlot: IAttendeeMeeting | null;
  refetchSlots: () => void;
  onClose: () => void;
}

export const AttendeeBookAppointment = ({
  isOpen,
  selectedSlot,
  refetchSlots,
  onClose
}: AttendeeBookAppointmentProps) => {
  const { bookAppointmentMutation, isPending } = useAttendeeBookAppointment({
    onSuccess: () => {
      toast.success('Meeting booked successfully');
      refetchSlots();
      onClose();
    },
    onError: (error) => {
      toast.error(errorHandler(error));
    }
  });

  const handleBookAppointment = () => {
    if (selectedSlot?.id) {
      bookAppointmentMutation({ meetingId: selectedSlot.id });
    }
  };

  const { startTime, endTime } = selectedSlot || {};

  const handleCloseModal = () => {
    if (isPending) return;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Book meeting"
      description="Book a meeting with exhibitor"
      contentClassName="px-0 pb-0 overflow-hidden max-w-[500px] sm:max-w-[524px]"
      headerClassName="px-6"
    >
      <div className="flex flex-col gap-[1.86rem] w-full text-left relative mt-8">
        <div className="px-8">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-foreground flex gap-2">
                  <span className="font-semibold ">Start Time:</span>
                  <span>
                    {startTime
                      ? formatDate(startTime, false, 'MMM dd, yyyy : hh:mm a')
                      : 'Unknown'}
                  </span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-foreground flex gap-2">
                  <span className="font-semibold ">End Time:</span>
                  <span>
                    {endTime
                      ? formatDate(endTime, false, 'MMM dd, yyyy : hh:mm a')
                      : 'Unknown'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center flex-col gap-3">
              <p className="font-medium text-green-600">Available</p>
            </div>
          </div>
        </div>
        <div className="mt-[10.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
          <Button
            variant="outline"
            className="gap-[0.5rem] flex items-center h-8"
            type="button"
            onClick={handleCloseModal}
            disabled={isPending}
          >
            <span>Cancel</span>
          </Button>

          <LoadingButton
            variant="tertiary"
            className="gap-[0.5rem] flex items-center h-8"
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            onClick={handleBookAppointment}
          >
            <span>Confirm meeting</span>
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
};
