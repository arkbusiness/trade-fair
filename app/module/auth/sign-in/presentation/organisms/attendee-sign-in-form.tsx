'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { PasswordInput } from '@/app/core/shared/components/molecules/password-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { errorHandler } from '@/app/core/shared/utils';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import toast from 'react-hot-toast';
import { useAttendeeAuthStore } from '../../../store';
import { useRouter } from 'nextjs-toploader/app';
import { useAttendeeSignin } from '../../api';

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

  const { signinMutation, isPending } = useAttendeeSignin({
    onSuccess: (data) => {
      const token = data?.accessToken;
      if (token) {
        handleSaveToken({ accessToken: token });
        router.push(ATTENDEE_APP_ROUTES.root());
      } else {
        toast.error('Something went wrong');
      }
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

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
    signinMutation(values);
  };

  const isLoading = isPending;

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
