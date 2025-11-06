'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import {
  ConfirmationModal,
  Pagination
} from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { Calendar } from 'lucide-react';
import { AttendeeMeetingItem } from '../molecules';
import { useState } from 'react';
import { errorHandler } from '@/app/core/shared/utils';
import toast from 'react-hot-toast';
import { useCancelAppointment } from '../../api/cancel-appointment';
import { AttendeeMeeting } from '../../api/get-attendee-appointments';

interface AttendeeMeetingsItemsProps {
  appointments: AttendeeMeeting[];
  isLoading: boolean;
  pageCount: number;
  page: number;
}

enum ModalType {
  CANCEL_APPOINTMENT,
  NONE
}

export const AttendeeMeetingsItems = ({
  appointments,
  isLoading,
  pageCount,
  page
}: AttendeeMeetingsItemsProps) => {
  const [toBeCancelledId, setToBeCancelledId] = useState('');
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const { setMultipleParam, searchParamsObject } = useSetParams();

  const { cancelAppointment, isPending } = useCancelAppointment({
    onSuccess: () => {
      toast.success('Appointment cancelled successfully');
      setModalType(ModalType.NONE);
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

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

  const handleCloseModal = () => {
    if (isPending) return;
    setModalType(ModalType.NONE);
  };

  const handleConfirmCancel = (id: string) => {
    switch (modalType) {
      case ModalType.CANCEL_APPOINTMENT:
        cancelAppointment(id);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={modalType !== ModalType.NONE}
        onClose={handleCloseModal}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this appointment?"
        isLoading={isPending}
        onConfirm={() => handleConfirmCancel(toBeCancelledId)}
      />
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
          <AttendeeMeetingItem
            key={appointment.id}
            appointment={appointment}
            handleCancel={() => {
              setToBeCancelledId(appointment.id);
              setModalType(ModalType.CANCEL_APPOINTMENT);
            }}
          />
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
