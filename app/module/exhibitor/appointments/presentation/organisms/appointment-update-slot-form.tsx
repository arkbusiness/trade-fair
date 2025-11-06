'use client';

import {
  Button,
  DatePicker,
  ErrorText
} from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import {
  IAppointmentSlot,
  useAppointmentEvent,
  useUpdateAppointmentSlot
} from '../../api';

interface AppointmentSlotFormProps {
  isOpen: boolean;
  appointment: IAppointmentSlot | null;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  startDate: yup
    .date()
    .required('Start date is required')
    .typeError('Must be a valid date'),
  endDate: yup
    .date()
    .required('End date is required')
    .typeError('Must be a valid date')
    .test(
      'end-date-greater-than-start-date',
      'End date must be greater than start date',
      function (endDate, ctx) {
        const startDate = ctx.parent.startDate;
        return !startDate || endDate > startDate;
      }
    )
});

type AppointmentSlotFormValues = yup.InferType<typeof validationSchema>;

export const AppointmentUpdateSlotForm = ({
  isOpen,
  appointment,
  onClose
}: AppointmentSlotFormProps) => {
  const { eventStartDate, eventEndDate, isLoadingAppointmentEvent } =
    useAppointmentEvent();

  const { updateAppointmentSlot, isPending } = useUpdateAppointmentSlot({
    onSuccess: () => {
      toast.success('Time slot updated successfully');
      form.reset();
      handleCloseModal();
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });
  const form = useForm<AppointmentSlotFormValues>({
    values: {
      startDate: appointment?.startTime
        ? new Date(appointment.startTime)
        : (undefined as never),
      endDate: appointment?.endTime
        ? new Date(appointment.endTime)
        : (undefined as never)
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = form;

  const handleCloseModal = () => {
    if (isPending) return;
    onClose();
  };

  const onSubmit = (values: AppointmentSlotFormValues) => {
    if (!appointment?.id) return;
    updateAppointmentSlot({
      slotId: appointment.id,
      startTime: formatISO(values.startDate),
      endTime: formatISO(values.endDate)
    });
  };

  const { startDate: startDateError, endDate: endDateError } = errors ?? {};

  const watchedStartDate = watch('startDate');
  const watchedEndDate = watch('endDate');

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Edit time slot"
      description="You can easily create and manage your time availability for meetings with attendees."
      contentClassName="px-0 pb-0"
      headerClassName="px-6 border-none"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        autoComplete="off"
      >
        {/* To focus on the first input */}
        <input type="text" className="absolute top-0 left-0 w-0 h-0" />

        <div className="flex flex-col gap-x-[1.86rem] gap-y-3 w-full text-left px-6 mt-3 overflow-y-auto h-[300px] py-4">
          <div className="grid sm:grid-cols-[1fr_1fr] gap-x-5 gap-y-[1.86rem] items-center">
            {/* Start Date */}
            <div className="w-full flex flex-col">
              <DatePicker
                value={watchedStartDate}
                name="from"
                label="Start time"
                placeholderText="mm/dd/yyyy"
                showTimeSelect
                timeIntervals={5}
                inputClassName="text-xs!"
                isDisabled={isPending || isLoadingAppointmentEvent}
                min={eventStartDate}
                handleChange={({ value }) => {
                  setValue('startDate', value as Date, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
              />
              <ErrorText message={startDateError?.message} />
            </div>

            {/* End Date */}
            <div className="w-full flex flex-col">
              <DatePicker
                value={watchedEndDate}
                name="to"
                label="End time"
                placeholderText="mm/dd/yyyy"
                showTimeSelect
                timeIntervals={5}
                inputClassName="text-xs!"
                max={eventEndDate}
                isDisabled={isPending || isLoadingAppointmentEvent}
                handleChange={({ value }) => {
                  setValue('endDate', value as Date, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
              />
              <ErrorText message={endDateError?.message} />
            </div>
          </div>
        </div>

        <div className="mt-[.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
          <Button
            variant="outline"
            className="gap-[0.5rem] flex items-center h-8"
            type="button"
            onClick={handleCloseModal}
            disabled={isPending || isLoadingAppointmentEvent}
          >
            <span>Cancel</span>
          </Button>

          <LoadingButton
            variant="tertiary"
            className="gap-[0.5rem] flex items-center h-8"
            type="submit"
            isLoading={isPending}
            disabled={isPending || isLoadingAppointmentEvent}
          >
            <span>Save changes</span>
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
