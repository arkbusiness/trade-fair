'use client';

import {
  ConfirmationModal,
  LoadingButton,
  Modal
} from '@/app/core/shared/components/molecules';
import { formatDate, formatSchedule, formatTime } from '@/app/core/shared/lib';
import { errorHandler } from '@/app/core/shared/utils';
import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  IAppointmentSlot,
  SlotStatus,
  useCancelAppointmentSlot,
  useCompleteAppointmentSlot,
  useDeleteAppointmentSlot
} from '../../api';
import { AppointmentStatusBadge } from './appointment-status-badge';

interface AppointmentDetailProps {
  isOpen: boolean;
  appointment: IAppointmentSlot | null;
  handleEdit?: () => void;
  onClose: () => void;
}

enum ModalType {
  MARK_AS_COMPLETED = 'MARK_AS_COMPLETED',
  MARK_AS_CANCELLED = 'MARK_AS_CANCELLED',
  DELETE_SLOT = 'DELETE_SLOT',
  NONE = 'NONE'
}

export const AppointmentDetail = ({
  isOpen,
  appointment,
  onClose,
  handleEdit
}: AppointmentDetailProps) => {
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const { cancelAppointmentSlot, isPending: isCancelling } =
    useCancelAppointmentSlot({
      onSuccess: () => {
        toast.success('Appointment cancelled successfully.');
        handleCloseModal();
      },
      onError: (error) => {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      }
    });

  const { completeAppointmentSlot, isPending: isCompleting } =
    useCompleteAppointmentSlot({
      onSuccess: () => {
        toast.success('Appointment completed successfully.');
        handleCloseModal();
      },
      onError: (error) => {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      }
    });

  const { deleteAppointmentSlot, isPending: isDeleting } =
    useDeleteAppointmentSlot({
      onSuccess: () => {
        toast.success('Appointment deleted successfully.');
        handleCloseModal();
      },
      onError: (error) => {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      }
    });

  const isPending = isCancelling || isCompleting || isDeleting;

  const { attendee, status, startTime, endTime } = appointment || {};
  const isBooked = status === SlotStatus.BOOKED;
  const isAvailable = status === SlotStatus.AVAILABLE;

  const handleCloseModal = () => {
    if (isPending) return;
    setActiveModal(ModalType.NONE);
    onClose();
  };

  const confirmModal = {
    [ModalType.MARK_AS_COMPLETED]: {
      title: 'Mark as Completed',
      description: 'Are you sure you want to mark this order as completed?'
    },
    [ModalType.MARK_AS_CANCELLED]: {
      title: 'Mark as Cancelled',
      description: 'Are you sure you want to mark this order as paid?'
    },
    [ModalType.DELETE_SLOT]: {
      title: 'Delete Slot',
      description: 'Are you sure you want to delete this slot?'
    },
    [ModalType.NONE]: {
      title: 'NONE',
      description: ''
    }
  } as Record<
    ModalType,
    {
      title: string;
      description: string;
    }
  >;

  const handleCancelSlot = () => {
    if (!appointment?.id) return;
    cancelAppointmentSlot({ slotId: appointment.id });
  };

  const handleCompleteSlot = () => {
    if (!appointment?.id) return;
    completeAppointmentSlot({ slotId: appointment.id });
  };

  const handleDeleteSlot = () => {
    if (!appointment?.id) return;
    deleteAppointmentSlot({ slotId: appointment.id });
  };

  const handleConfirm = () => {
    switch (activeModal) {
      case ModalType.MARK_AS_CANCELLED:
        handleCancelSlot();
        break;
      case ModalType.MARK_AS_COMPLETED:
        handleCompleteSlot();
        break;
      case ModalType.DELETE_SLOT:
        handleDeleteSlot();
        break;
      default:
        break;
    }
  };

  const isDisableButtons =
    isPending ||
    status === SlotStatus.COMPLETED ||
    status === SlotStatus.CANCELLED;

  return (
    <>
      <ConfirmationModal
        isOpen={activeModal !== ModalType.NONE}
        onClose={handleCloseModal}
        title={confirmModal[activeModal].title}
        description={confirmModal[activeModal].description}
        isLoading={isPending}
        onConfirm={handleConfirm}
      />
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Booking details"
        visuallyHiddenTitle={true}
        description=""
        contentClassName="px-0 pb-0 overflow-hidden"
        headerClassName="px-6 border-none"
      >
        <div className="px-6">
          <div className="flex mb-12 items-center justify-start gap-2">
            {/* <AppointmentAvatar attendee={attendee} /> */}
            <h4 className="text-lg font-semibold text-foreground ">
              {attendee?.contactName || `Slot-#${appointment?.id?.slice(0, 5)}`}
            </h4>
            <AppointmentStatusBadge status={status as never} />
          </div>

          <div className="flex gap-4 justify-between flex-wrap">
            {/* Date & Time */}
            <div className="flex flex-col gap-2">
              <p className="uppercase text-[13px] font-normal">Date & Time</p>
              <div className="flex gap-2 items-center">
                <Calendar size={15} />
                <p className="text-xs opacity-80">
                  {startTime ? formatDate(startTime, false) : 'Unknown'}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <Clock size={15} />
                <p className="text-xs opacity-80 flex gap-1">
                  <span>{startTime ? formatTime(startTime) : 'Unknown'}</span>
                  <span>
                    {startTime &&
                      endTime &&
                      `(${formatSchedule(new Date(startTime), new Date(endTime)).durationLabel})`}
                  </span>
                </p>
              </div>
            </div>

            {/* Attendee */}
            {isBooked && (
              <div className="flex flex-col gap-1">
                <p className="uppercase text-[13px] font-normal">
                  Contact Info
                </p>
                <p className="text-xs font-semibold text-light-blue-2">
                  Email: {attendee?.email || 'N/A'}
                </p>
                <p className="text-xs opacity-80">
                  Phone: {attendee?.phone || 'N/A'}
                </p>
              </div>
            )}
            <div></div>
          </div>
          <div></div>
        </div>
        <div className="mt-[2.19rem] w-full flex gap-2.5 bg-gray-light-3 py-5 px-6">
          {isBooked && (
            <LoadingButton
              variant="tertiary"
              className="gap-[0.5rem] flex items-center h-8"
              type="submit"
              isLoading={isPending}
              disabled={isDisableButtons}
              onClick={() => setActiveModal(ModalType.MARK_AS_COMPLETED)}
            >
              <span>Mark as completed</span>
            </LoadingButton>
          )}

          {isAvailable && (
            <LoadingButton
              variant="tertiary"
              className="gap-[0.5rem] flex items-center h-8"
              type="submit"
              isLoading={isPending}
              onClick={() => setActiveModal(ModalType.DELETE_SLOT)}
            >
              <span>Delete slot</span>
            </LoadingButton>
          )}

          {isAvailable && (
            <LoadingButton
              variant="outline"
              className="gap-[0.5rem] flex items-center h-8"
              type="submit"
              isLoading={isPending}
              onClick={handleEdit}
            >
              <span>Edit slot</span>
            </LoadingButton>
          )}
        </div>
      </Modal>
    </>
  );
};
