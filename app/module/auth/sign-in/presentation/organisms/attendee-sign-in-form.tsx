'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { PasswordInput } from '@/app/core/shared/components/molecules/password-input';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { attendeeAuthService } from '../../../services';
import { errorHandler } from '@/app/core/shared/utils';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAttendeeAuthStore } from '../../../store';

const validationSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .trim()
    .required('Username or email is required'),
  pin: yup.string().required('Password is required.')
});

export interface IAttendeeSigninFormValues {
  usernameOrEmail: string;
  pin: string;
}

export const AttendeeSigninForm = () => {
  const router = useRouter();
  const { handleSaveToken } = useAttendeeAuthStore();
  const mutation = useCustomMutation<{ accessToken: string }>();
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<IAttendeeSigninFormValues>({
    defaultValues: {
      usernameOrEmail: '',
      pin: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (values: IAttendeeSigninFormValues) => {
    mutation.mutate(attendeeAuthService.signin(values), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess(data) {
        const token = data?.accessToken;
        if (token) {
          handleSaveToken({ accessToken: token });
          router.push(ATTENDEE_APP_ROUTES.root());
        } else {
          toast.error('Something went wrong');
        }
      }
    });
  };

  const isLoading = mutation.isPending;

  const { usernameOrEmail: usernameOrEmailError, pin: pinError } = errors;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isLoading} className="flex flex-col gap-[1.86rem]">
        {/* Email */}
        <div>
          <Input
            type="text"
            label="Username or email"
            hasError={!!usernameOrEmailError?.message?.length}
            {...register('usernameOrEmail')}
          />
          <ErrorText message={usernameOrEmailError?.message} />
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            {...register('pin')}
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
          Sign in
        </LoadingButton>
      </fieldset>
    </form>
  );
};
