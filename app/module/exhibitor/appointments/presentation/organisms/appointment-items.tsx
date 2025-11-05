'use client';

import { Spinner } from '@/app/core/shared/components/atoms';
import {
  OverlaySpinner,
  Pagination
} from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { useState } from 'react';
import { IAppointmentSlot, SlotStatus, useAppointmentSlots } from '../../api';
import { AppointmentDetail, AppointmentItem } from '../molecules';
import { AppointmentCreateSlotForm } from './appointment-create-slot-form';
import { AppointmentsTabs } from './appointments-tabs';
import { AppointmentUpdateSlotForm } from './appointment-update-slot-form';

export const APPOINTMENT_STATUS_MAP = {
  [SlotStatus.AVAILABLE]: {
    label: 'Available',
    style: {
      bg: 'bg-yellow-700',
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

enum ModalType {
  CREATE_SLOT = 'CREATE_SLOT',
  EDIT_SLOT = 'EDIT_SLOT',
  VIEW_SLOT = 'VIEW_SLOT',
  NONE = 'NONE'
}

export const AppointmentItems = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointmentSlot | null>(null);
  const { setMultipleParam, searchParamsObject, removeQueryParam } =
    useSetParams();

  const appointmentsQuery = {
    status: searchParamsObject.status ?? '',
    today: searchParamsObject.today ?? '',
    page: searchParamsObject.page ?? '1'
  };

  const {
    slots,
    isLoadingAppointments,
    paginationMeta,
    isRefetchingAppointments
  } = useAppointmentSlots({
    ...appointmentsQuery
  });

  const { page, total, pages: pagecount } = paginationMeta;

  const isCreateSlot = searchParamsObject.createSlot === '1';

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

  const handleViewSlot = (appointment: IAppointmentSlot) => {
    setActiveModal(ModalType.VIEW_SLOT);
    setSelectedAppointment(appointment);
  };

  const handleClose = () => {
    setActiveModal(ModalType.NONE);
    removeQueryParam('createSlot');
    setSelectedAppointment(null);
  };

  const handleEdit = () => {
    setSelectedAppointment(selectedAppointment);
    setActiveModal(ModalType.EDIT_SLOT);
  };

  return (
    <>
      {isRefetchingAppointments && <OverlaySpinner />}

      <AppointmentCreateSlotForm
        isOpen={isCreateSlot || activeModal === ModalType.CREATE_SLOT}
        onClose={handleClose}
      />

      <AppointmentUpdateSlotForm
        isOpen={activeModal === ModalType.EDIT_SLOT}
        appointment={selectedAppointment}
        onClose={handleClose}
      />

      <AppointmentDetail
        isOpen={!!selectedAppointment && activeModal === ModalType.VIEW_SLOT}
        appointment={selectedAppointment}
        onClose={handleClose}
        handleEdit={handleEdit}
      />
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
          <p className="text-gray-500 text-lg">No slots found</p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            appointment={appointment}
            handleView={() => handleViewSlot(appointment)}
          />
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
