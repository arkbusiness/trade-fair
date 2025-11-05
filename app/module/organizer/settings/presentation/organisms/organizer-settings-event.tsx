'use client';

import {
  DatePicker,
  ErrorText,
  Input
} from '@/app/core/shared/components/atoms';
import {
  CoverImageUploader,
  LoadingButton,
  OverlaySpinner
} from '@/app/core/shared/components/molecules';
import { useOrganizerUser } from '@/app/core/shared/api';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO } from 'date-fns';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useUpdateEvent } from '../../api';

const validationSchema = yup.object().shape({
  file: yup.mixed().nullable(),
  eventName: yup.string().trim().required('Event name is required'),
  venueName: yup.string().trim().required('Venue name is required'),
  eventStartDate: yup
    .date()
    .required('Start date is required')
    .typeError('Must be a valid date'),
  eventEndDate: yup
    .date()
    .required('End date is required')
    .typeError('Must be a valid date')
    .test(
      'end-date-greater-than-start-date',
      'End date must be greater than start date',
      function (eventEndDate, ctx) {
        const eventStartDate = ctx.parent.eventStartDate;
        return !eventStartDate || eventEndDate > eventStartDate;
      }
    )
});

type IEventFormValues = yup.InferType<typeof validationSchema>;

export const OrganizerSettingsEvent = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { user, refetchUser } = useOrganizerUser();

  const { updateEvent, isPending } = useUpdateEvent({
    onSuccess: () => {
      toast.success('Event info updated successfully');
      refetchUser();
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

  const form = useForm<IEventFormValues>({
    values: {
      eventName: user?.eventName ?? '',
      venueName: user?.venueName ?? '',
      eventStartDate: user?.eventStartDate
        ? new Date(user?.eventStartDate)
        : (undefined as never),
      eventEndDate: user?.eventEndDate
        ? new Date(user?.eventEndDate)
        : (undefined as never),
      file: null
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register
  } = form;

  const watchedStartDate = watch('eventStartDate');
  const watchedEndDate = watch('eventEndDate');
  const {
    eventName: eventNameError,
    eventStartDate: eventStartDateError,
    eventEndDate: eventEndDateError,
    venueName: venueNameError
  } = errors;

  const onSubmit = (values: IEventFormValues) => {
    updateEvent({
      eventName: values.eventName,
      venueName: values.venueName,
      eventStartDate: formatISO(values.eventStartDate),
      eventEndDate: formatISO(values.eventEndDate),
      file: values.file as File | null
    });
  };

  return (
    <>
      {isPending && <OverlaySpinner />}
      <div className="px-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">Event info</h3>
          <p className="text-sm font-light">Update your event info here</p>
        </div>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <fieldset className="w-full" disabled={isPending}>
            <div className="h-[clamp(10rem,_30vw,_25rem)]">
              <p className="text-sm font-semibold mb-2">Event banner</p>
              <CoverImageUploader
                onImageUpload={(file: File | null) => {
                  setValue('file', file);
                }}
                imageUrl={user?.eventLogoUrl || ''}
              />
            </div>

            {/* Venue Name */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full border-t py-6 mt-14">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Venue name</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <Input
                  label="Venue name"
                  labelClassName="md:hidden"
                  placeholder="Enter your venue name"
                  hasError={!!venueNameError?.message?.length}
                  {...register('venueName')}
                />
                <ErrorText message={venueNameError?.message} />
              </div>
            </div>
            {/* Event Name */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full border-y py-6">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Event name</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <Input
                  label="Event name"
                  labelClassName="md:hidden"
                  placeholder="Enter your event name"
                  hasError={!!eventNameError?.message?.length}
                  {...register('eventName')}
                />
                <ErrorText message={eventNameError?.message} />
              </div>
            </div>

            {/* Start Date */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full border-b py-6">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Start date</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <DatePicker
                  value={watchedStartDate}
                  name="eventStartDate"
                  label="Start date"
                  labelClassName="md:hidden"
                  placeholderText="mm/dd/yyyy"
                  showTimeSelect={true}
                  max={watchedEndDate}
                  handleChange={({ value }) => {
                    setValue('eventStartDate', value as Date, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true
                    });
                  }}
                />
                <ErrorText message={eventStartDateError?.message} />
              </div>
            </div>

            {/* End Date */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full py-6 border-b">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">End date</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <DatePicker
                  value={watchedEndDate}
                  name="endDate"
                  label="End date"
                  showTimeSelect={true}
                  placeholderText="mm/dd/yyyy"
                  min={watchedStartDate}
                  handleChange={({ value }) => {
                    setValue('eventEndDate', value as Date, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true
                    });
                  }}
                />
                <ErrorText message={eventEndDateError?.message} />
              </div>
            </div>
          </fieldset>
          <div className="flex justify-end max-w-[55.43rem] w-full mt-6">
            <LoadingButton
              type="submit"
              variant="tertiary"
              className="h-10 rounded-[8px]"
              isLoading={isPending}
              disabled={isPending}
            >
              Save changes
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};
