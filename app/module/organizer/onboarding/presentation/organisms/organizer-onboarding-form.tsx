'use client';

import {
  DatePicker,
  ErrorText,
  Input
} from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { organizerAuthService } from '@/app/module/auth/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
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

type OrganizerOnboardingFormValues = yup.InferType<typeof validationSchema>;

export const OrganizerOnboardingForm = () => {
  const mutation = useCustomMutation<OrganizerOnboardingFormValues>();
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register
  } = useForm<OrganizerOnboardingFormValues>({
    defaultValues: {
      eventName: '',
      eventStartDate: undefined,
      eventEndDate: undefined
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (values: OrganizerOnboardingFormValues) => {
    const { eventName, venueName, eventStartDate, eventEndDate } = values;

    const formValues = {
      eventName,
      venueName,
      eventStartDate: formatISO(eventStartDate),
      eventEndDate: formatISO(eventEndDate)
    };

    mutation.mutate(organizerAuthService.onboarding(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Event created successfully');
        router.push(ORGANIZER_APP_ROUTES.root());
      }
    });
  };

  const watchedStartDate = watch('eventStartDate');
  const watchedEndDate = watch('eventEndDate');

  const {
    eventName: eventNameError,
    eventStartDate: eventStartDateError,
    eventEndDate: eventEndDateError,
    venueName: venueNameError
  } = errors;

  return (
    <form
      className="flex flex-col gap-[1.86rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset
        className="flex flex-col gap-[1.86rem] w-full"
        disabled={mutation.isPending}
      >
        <div className="grid lg:grid-cols-2 gap-[1.86rem]">
          {/* Venue Name */}
          <div>
            <Input
              label="Venue Name"
              placeholder="e.g. Market Place"
              hasError={!!venueNameError?.message?.length}
              {...register('venueName')}
            />
            <ErrorText message={venueNameError?.message} />
          </div>

          {/* Event Name */}

          <div>
            <Input
              label="Event Name"
              placeholder="e.g. African Marketplace"
              hasError={!!eventNameError?.message?.length}
              {...register('eventName')}
            />
            <ErrorText message={eventNameError?.message} />
          </div>
        </div>

        {/* Start Date */}
        <div className="w-full">
          <DatePicker
            value={watchedStartDate}
            name="eventStartDate"
            label="Start date"
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

        {/* End Date */}
        <div className="w-full">
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
      </fieldset>

      <LoadingButton
        type="submit"
        variant="tertiary"
        isLoading={mutation.isPending}
        disabled={mutation.isPending}
      >
        Submit
      </LoadingButton>
    </form>
  );
};
