'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { PasswordInput } from '@/app/core/shared/components/molecules/password-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required.')
});

export interface ISigninFormValues {
  email: string;
  password: string;
}

interface SigninFormProps {
  isLoading: boolean;
  handleSubmitForm: (values: ISigninFormValues) => void;
}
export const SigninForm = ({
  isLoading = false,
  handleSubmitForm
}: SigninFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<ISigninFormValues>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (values: ISigninFormValues) => {
    handleSubmitForm(values);
  };

  const { email: emailError, password: passwordError } = errors;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isLoading} className="flex flex-col gap-[1.86rem]">
        {/* Email */}
        <div>
          <Input
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            hasError={!!emailError?.message?.length}
            {...register('email')}
          />
          <ErrorText message={emailError?.message} />
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            {...register('password')}
            showInfo={false}
            hasError={!!passwordError?.message?.length}
          />
          <ErrorText message={passwordError?.message} />
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
