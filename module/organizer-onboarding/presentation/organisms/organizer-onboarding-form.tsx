'use client';

import {
  DatePicker,
  ErrorText,
  Input,
  TimePicker
} from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  eventName: yup.string().trim().required('Event name is required'),
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
    ),
  startTime: yup
    .date()
    .required('Start time is required')
    .typeError('Must be a valid date'),
  endTime: yup
    .date()
    .required('End time is required')
    .typeError('Must be a valid date')
    .test(
      'is-greater-created',
      'Must be greater than start time',
      function (value) {
        const { startTime } = this.parent;
        if (!value || !startTime) return true;
        return value > startTime;
      }
    )
});

type OrganizerOnboardingFormValues = yup.InferType<typeof validationSchema>;

export const OrganizerOnboardingForm = () => {
  const { searchParamsObject } = useSetParams();
  const token = searchParamsObject['token'];
  const mutation = useCustomMutation<OrganizerOnboardingFormValues>();
  // const router = useRouter();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register
  } = useForm<OrganizerOnboardingFormValues>({
    defaultValues: {
      eventName: '',
      startDate: undefined,
      endDate: undefined,
      startTime: undefined,
      endTime: undefined
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (values: OrganizerOnboardingFormValues) => {
    const { eventName, startDate, endDate, startTime, endTime } = values;

    const formValues = {
      token,
      eventName,
      startDate,
      endDate,
      startTime,
      endTime
    };

    console.log(formValues);

    // mutation.mutate(organizerAuthService.register(formValues), {
    //   onError(error) {
    //     const errorMessage = errorHandler(error);
    //     toast.error(errorMessage);
    //   },
    //   onSuccess() {
    //     toast.success('Event created successfully');
    //     router.push(ORGANIZER_APP_ROUTES.auth.onboarding());
    //   }
    // });
  };

  const watchedStartDate = watch('startDate');
  const watchedEndDate = watch('endDate');
  const watchedStartTime = watch('startTime');
  const watchedEndTime = watch('endTime');

  const {
    eventName: eventNameError,
    startDate: startDateError,
    endDate: endDateError,
    startTime: startTimeError,
    endTime: endTimeError
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

        {/* Date */}
        <div className="grid lg:grid-cols-2 gap-[1.86rem]">
          {/* Start Date */}
          <div className="w-full">
            <DatePicker
              value={watchedStartDate}
              name="startDate"
              label="Start date"
              placeholderText="mm/dd/yyyy"
              // max={watchedEndDate}
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
          <div className="w-full">
            <DatePicker
              value={watchedEndDate}
              name="endDate"
              label="End date"
              placeholderText="mm/dd/yyyy"
              // min={watchedStartDate}
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

        {/* Time */}
        <div className="grid lg:grid-cols-2 gap-[1.86rem] w-full">
          {/* Start Time */}
          <div className="w-full">
            <TimePicker
              name="startTime"
              label="Start time"
              placeholderText="Select time"
              value={watchedStartTime}
              handleChange={({ value }) => {
                setValue('startTime', value as Date, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }}
            />
            <ErrorText message={startTimeError?.message} />
          </div>

          {/* End Time */}
          <div className="w-full">
            <TimePicker
              name="endTime"
              label="End time"
              placeholderText="Select time"
              value={watchedEndTime}
              handleChange={({ value }) => {
                setValue('endTime', value as Date, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }}
            />
            <ErrorText message={endTimeError?.message} />
          </div>
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
