'use client';

import { ErrorText } from '@/app/core/shared/components/atoms';
import {
  LoadingButton,
  PasswordInput
} from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { exhibitorSettingsService } from '../../services';

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
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
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Confirm your password.')
});

type IFormValues = yup.InferType<typeof validationSchema>;

export const ExhibitorChangePasswordForm = () => {
  const mutation = useCustomMutation();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm<IFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const {
    currentPassword: currentPasswordError,
    newPassword: newPasswordError,
    confirmPassword: confirmPasswordError
  } = errors;

  const onSubmit = (values: IFormValues) => {
    const formValues = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    };
    mutation.mutate(exhibitorSettingsService.updatePassword(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Password updated successfully');
        reset();
      }
    });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-foreground">
              Change Password
            </h3>
            <p className="text-sm font-light">Update your password here.</p>
          </div>

          <div>
            <LoadingButton
              variant="tertiary"
              className="h-[35px]"
              type="submit"
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
        <fieldset
          className="w-full px-8 flex flex-col gap-6 mt-6"
          disabled={mutation.isPending}
        >
          {/* Current Password */}
          <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full border-t  py-6">
            <div className="hidden md:block">
              <p className="text-sm font-semibold">Current password</p>
            </div>
            <div className="max-w-[25.43rem] w-full">
              <PasswordInput
                label="Current password"
                hasError={!!currentPasswordError?.message?.length}
                {...register('currentPassword')}
              />
              <ErrorText message={currentPasswordError?.message} />
            </div>
          </div>

          {/* New Password */}
          <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full border-t  py-6">
            <div className="hidden md:block">
              <p className="text-sm font-semibold">New password</p>
            </div>
            <div className="max-w-[25.43rem] w-full">
              <PasswordInput
                label="New password"
                hasError={!!newPasswordError?.message?.length}
                {...register('newPassword')}
              />
              <ErrorText message={newPasswordError?.message} />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full py-6 border-t">
            <div className="hidden md:block">
              <p className="text-sm font-semibold">Confirm password</p>
            </div>
            <div className="max-w-[25.43rem] w-full">
              <PasswordInput
                label="Confirm password"
                hasError={!!confirmPasswordError?.message?.length}
                {...register('confirmPassword')}
              />
              <ErrorText message={confirmPasswordError?.message} />
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};
