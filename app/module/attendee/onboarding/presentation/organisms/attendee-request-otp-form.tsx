'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { attendeeOnboardingService } from '../../services/attendee-onboarding.service';
import { errorHandler } from '@/app/core/shared/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { useAttendeeOnboardingStore } from '../../store';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
  inviteCode: yup.string().required('Invite code is required.')
});

export interface IAttendeeRequestOtpFormValues {
  email: string;
  inviteCode: string;
}

export const AttendeeRequestOtpForm = () => {
  const router = useRouter();
  const mutation = useCustomMutation();
  const { handleSaveOTPInput } = useAttendeeOnboardingStore();

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<IAttendeeRequestOtpFormValues>({
    defaultValues: {
      email: '',
      inviteCode: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (values: IAttendeeRequestOtpFormValues) => {
    const { email, inviteCode } = values;

    const formValues = {
      email,
      inviteCode
    };

    mutation.mutate(attendeeOnboardingService.requestOtp(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('OTP sent successfully');
        handleSaveOTPInput({ email, inviteCode });
        router.push(ATTENDEE_APP_ROUTES.onboarding.verifyOtp());
      }
    });
  };

  const { email: emailError, inviteCode: inviteCodeError } = errors;

  const isLoading = mutation.isPending;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isLoading} className="flex flex-col gap-[1.86rem]">
        {/* Email */}
        <div>
          <Input
            type="email"
            label="Email*"
            placeholder="example@gmail.com"
            hasError={!!emailError?.message?.length}
            {...register('email')}
          />
          <ErrorText message={emailError?.message} />
        </div>

        {/* Invite Code */}
        <div>
          <Input
            label="Invitation code*"
            placeholder="e.g. J79EAC4P"
            {...register('inviteCode')}
            hasError={!!inviteCodeError?.message?.length}
          />
          <ErrorText message={inviteCodeError?.message} />
        </div>

        <LoadingButton
          type="submit"
          variant="tertiary"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Send OTP
        </LoadingButton>
      </fieldset>
    </form>
  );
};
