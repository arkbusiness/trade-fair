'use client';

import {
  Button,
  DatePicker,
  ErrorText
} from '@/app/core/shared/components/atoms';
import {
  IconButton,
  LoadingButton,
  Modal,
  OverlaySpinner
} from '@/app/core/shared/components/molecules';
import { cn, errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO } from 'date-fns';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useAppointmentEvent, useCreateAppointmentSlots } from '../../api';

interface AppointmentSlotFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  slots: yup
    .array()
    .of(
      yup.object().shape({
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
      })
    )
    .required('At least one slot is required')
    .min(1, 'At least one slot is required')
});

type AppointmentSlotFormValues = yup.InferType<typeof validationSchema>;

export const AppointmentCreateSlotForm = ({
  isOpen,
  onClose
}: AppointmentSlotFormProps) => {
  const { eventStartDate, eventEndDate, isLoadingAppointmentEvent } =
    useAppointmentEvent();

  const { createAppointmentSlots, isPending } = useCreateAppointmentSlots({
    onSuccess: () => {
      toast.success('Time slot created successfully');
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
      slots: [
        {
          startDate: undefined as never,
          endDate: undefined as never
        }
      ]
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'slots'
  });

  const handleCloseModal = () => {
    if (isPending) return;
    onClose();
  };

  const onSubmit = (values: AppointmentSlotFormValues) => {
    const slots = values.slots.map((slot) => ({
      startTime: formatISO(slot.startDate),
      endTime: formatISO(slot.endDate)
    }));
    createAppointmentSlots({ slots });
  };

  const handleAddNewItem = () => {
    append({
      startDate: undefined as never,
      endDate: undefined as never
    });
  };

  const { slots: slotsError } = errors ?? {};

  const watchedSlots = watch('slots');
  const hasMoreThanOneSlot = watchedSlots?.length > 1;

  return (
    <>
      {isLoadingAppointmentEvent && <OverlaySpinner />}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Create time slot"
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
            <div className="grid gap-x-4 gap-y-[1.86rem]">
              {fields.map((field, index) => {
                const slotError = slotsError?.[index];

                return (
                  <div
                    key={field.id}
                    className={cn('flex flex-col w-full text-left')}
                  >
                    <div className="flex justify-between">
                      <div className="w-8 h-8 rounded-full bg-highlight flex items-center justify-center mb-3">
                        <p>{index + 1}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[1fr_1fr_32px] gap-x-5 gap-y-[1.86rem] items-center">
                      {/* Start Date */}
                      <div className="w-full flex flex-col">
                        <DatePicker
                          value={watchedSlots[index].startDate}
                          name="from"
                          label="Start time"
                          placeholderText="mm/dd/yyyy"
                          showTimeSelect
                          timeIntervals={5}
                          inputClassName="text-xs!"
                          min={eventStartDate}
                          isDisabled={isPending || isLoadingAppointmentEvent}
                          handleChange={({ value }) => {
                            setValue(
                              `slots.${index}.startDate`,
                              value as Date,
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                                shouldTouch: true
                              }
                            );
                          }}
                        />
                        <ErrorText message={slotError?.startDate?.message} />
                      </div>

                      {/* End Date */}
                      <div className="w-full flex flex-col">
                        <DatePicker
                          value={watchedSlots[index].endDate}
                          name="to"
                          label="End time"
                          placeholderText="mm/dd/yyyy"
                          showTimeSelect
                          timeIntervals={5}
                          inputClassName="text-xs!"
                          isDisabled={isPending || isLoadingAppointmentEvent}
                          max={eventEndDate}
                          handleChange={({ value }) => {
                            setValue(`slots.${index}.endDate`, value as Date, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true
                            });
                          }}
                        />
                        <ErrorText message={slotError?.endDate?.message} />
                      </div>

                      {/* Remove Button */}
                      {hasMoreThanOneSlot && (
                        <div className="flex relative top-3">
                          <Button
                            type="button"
                            variant="outline"
                            aria-label="Remove item"
                            className="w-8 h-8"
                            onClick={() => remove(index)}
                            disabled={isPending}
                          >
                            <TrashIcon className="size-4 text-tertiary" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Add Button */}
            <div className="flex">
              <IconButton
                onClick={handleAddNewItem}
                variant="outline"
                type="button"
                disabled={isPending || isLoadingAppointmentEvent}
                className="text-foreground h-[33px]"
              >
                <span>Add slot</span>
                <PlusIcon />
              </IconButton>
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
    </>
  );
};
