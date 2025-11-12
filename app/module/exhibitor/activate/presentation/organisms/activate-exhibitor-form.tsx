'use client';

import { ErrorText } from '@/app/core/shared/components/atoms';
import {
  LoadingButton,
  PasswordInput
} from '@/app/core/shared/components/molecules';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { errorHandler } from '@/app/core/shared/utils';
import { useExhibitorAuthStore } from '@/app/module/auth/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useActivateExhibitor } from '../../api';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters long.')
    .matches(/\d/, 'Your password must include at least 1 digit.')
    .matches(/[A-Z]/, 'Your password must include at least 1 capital letter.')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Your password must include at least 1 symbol.'
    )
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm your password.')
});

type ActivateExhibitorFormValues = yup.InferType<typeof validationSchema>;

export const ActivateExhibitorForm = () => {
  const { tempAccessToken, userId } = useExhibitorAuthStore();
  const router = useRouter();

  const { activateExhibitor, isPending } = useActivateExhibitor({
    onSuccess: () => {
      toast.success(
        'Account activated successfully. Please login to continue.'
      );
      router.push(EXHIBITOR_APP_ROUTES.auth.login());
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
  } = useForm<ActivateExhibitorFormValues>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const { password: passwordError, confirmPassword: confirmPasswordError } =
    errors;

  const onSubmit = (values: ActivateExhibitorFormValues) => {
    if (!tempAccessToken || !userId) {
      toast.error(
        'Your session has expired. Please log in again to activate your account.'
      );
      router.push(EXHIBITOR_APP_ROUTES.auth.login());
      return;
    }

    activateExhibitor({
      userId: userId,
      password: values.password,
      accessToken: tempAccessToken
    });
  };

  return (
    <form
      className="flex flex-col gap-[1.86rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset
        className="flex flex-col gap-[1.86rem] w-full"
        disabled={isPending}
      >
        {/* Password */}
        <div>
          <PasswordInput
            label="Password"
            hasError={!!passwordError?.message?.length}
            {...register('password')}
          />
          <ErrorText message={passwordError?.message} />
        </div>

        {/* Confirm Password */}
        <div>
          <PasswordInput
            label="Confirm Password"
            hasError={!!confirmPasswordError?.message?.length}
            {...register('confirmPassword')}
          />
          <ErrorText message={confirmPasswordError?.message} />
        </div>
      </fieldset>

      <LoadingButton
        type="submit"
        variant="tertiary"
        isLoading={isPending}
        disabled={isPending}
      >
        Activate Account
      </LoadingButton>
    </form>
  );
};
