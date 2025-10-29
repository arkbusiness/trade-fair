'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import {
  CurrencySelector,
  LoadingButton,
  PasswordInput
} from '@/app/core/shared/components/molecules';
import {
  ATTENDEE_APP_ROUTES,
  DEFAULT_CURRENCY
} from '@/app/core/shared/constants';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { attendeeOnboardingService } from '../../services/attendee-onboarding.service';
import { useAttendeeOnboardingStore } from '../../store';

const validationSchema = yup.object().shape({
  attendeeEmail: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  attendeeInviteCode: yup.string().required('Invite code is required'),
  attendeeOtp: yup.string().required('OTP is required'),
  attendeeUsername: yup.string().required('Username is required'),
  attendeePin: yup.string().required('Pin is required'),
  attendeeAddress: yup.string().required('Address is required'),
  attendeeFirstName: yup.string().required('First name is required'),
  attendeeLastName: yup.string().required('Last name is required'),
  attendeeCurrency: yup.string().required('Currency is required')
});

export type AttendeeVerifyOtpFormValues = yup.InferType<
  typeof validationSchema
> & {
  interest?: string[];
};

export const AttendeeVerifyOtpForm = () => {
  const router = useRouter();
  const mutation = useCustomMutation();
  const { email, inviteCode } = useAttendeeOnboardingStore();
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register
  } = useForm<AttendeeVerifyOtpFormValues>({
    defaultValues: {
      attendeeEmail: email || '',
      attendeeInviteCode: inviteCode || '',
      attendeeOtp: '',
      attendeeUsername: '',
      attendeeAddress: '',
      attendeePin: '',
      attendeeFirstName: '',
      attendeeLastName: '',
      interest: [],
      attendeeCurrency: DEFAULT_CURRENCY
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (values: AttendeeVerifyOtpFormValues) => {
    const formValues = {
      username: values.attendeeUsername,
      pin: values.attendeePin,
      address: values.attendeeAddress,
      firstName: values.attendeeFirstName,
      lastName: values.attendeeLastName,
      interest: values.interest || [],
      currency: values.attendeeCurrency,
      email: values.attendeeEmail,
      inviteCode: values.attendeeInviteCode,
      otp: values.attendeeOtp
    };

    mutation.mutate(attendeeOnboardingService.verifyOtp(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Attendee created successfully');
        router.push(ATTENDEE_APP_ROUTES.auth.login());
      }
    });
  };

  const watchedCurrency = watch('attendeeCurrency');

  const {
    attendeeEmail: emailError,
    attendeeInviteCode: inviteCodeError,
    attendeeOtp: otpError,
    attendeeUsername: usernameError,
    attendeePin: pinError,
    attendeeAddress: addressError,
    attendeeFirstName: firstNameError,
    attendeeLastName: lastNameError,
    attendeeCurrency: currencyError
  } = errors;

  const isLoading = mutation.isPending;

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <fieldset disabled={isLoading} className="flex flex-col gap-[1.86rem]">
        {/* Email */}
        <div>
          <Input
            type="email"
            label="Email*"
            placeholder="example@gmail.com"
            hasError={!!emailError?.message?.length}
            {...register('attendeeEmail')}
          />
          <ErrorText message={emailError?.message} />
        </div>

        <div className="grid lg:grid-cols-2 gap-y-[1.86rem] gap-x-3">
          {/* Invite Code */}
          <div>
            <Input
              label="Invitation code*"
              placeholder="e.g. Enter your invitation code"
              {...register('attendeeInviteCode')}
              hasError={!!inviteCodeError?.message?.length}
            />
            <ErrorText message={inviteCodeError?.message} />
          </div>

          {/* OTP */}
          <div>
            <Input
              label="OTP"
              placeholder="Enter your OTP"
              {...register('attendeeOtp')}
              hasError={!!otpError?.message?.length}
            />
            <ErrorText message={otpError?.message} />
          </div>
        </div>

        {/* Username  */}
        <div>
          <Input
            label="Username*"
            placeholder="e.g. Enter your username"
            {...register('attendeeUsername')}
            hasError={!!usernameError?.message?.length}
          />
          <ErrorText message={usernameError?.message} />
        </div>

        <div className="grid lg:grid-cols-2 gap-y-[1.86rem] gap-x-3">
          {/* First Name */}
          <div>
            <Input
              label="First Name*"
              placeholder="Enter your first name"
              {...register('attendeeFirstName')}
              hasError={!!firstNameError?.message?.length}
            />
            <ErrorText message={firstNameError?.message} />
          </div>

          {/* Last Name */}
          <div>
            <Input
              label="Last Name*"
              placeholder="Enter your last name"
              {...register('attendeeLastName')}
              hasError={!!lastNameError?.message?.length}
            />
            <ErrorText message={lastNameError?.message} />
          </div>
        </div>

        {/* Currency */}
        <div>
          <CurrencySelector
            name="currency"
            value={watchedCurrency}
            onChange={(value) => {
              if (value) {
                setValue('attendeeCurrency', value, {
                  shouldValidate: true
                });
              }
            }}
            hasError={!!currencyError?.message?.length}
            label="Currency"
          />
          <ErrorText message={currencyError?.message} />
        </div>

        {/* Address */}
        <div>
          <Input
            label="Address*"
            placeholder="e.g. Enter your address"
            {...register('attendeeAddress')}
            hasError={!!addressError?.message?.length}
          />
          <ErrorText message={addressError?.message} />
        </div>

        {/*    Pin  */}
        <div>
          <PasswordInput
            label="Password*"
            placeholder="Enter your password"
            {...register('attendeePin')}
            showInfo={false}
            hasError={!!pinError?.message?.length}
          />
          <ErrorText message={pinError?.message} />
        </div>

        <LoadingButton
          type="submit"
          variant="tertiary"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Sign Up
        </LoadingButton>
      </fieldset>
    </form>
  );
};
