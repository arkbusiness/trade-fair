'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { PasswordInput } from '@/app/core/shared/components/molecules/password-input';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { useAuthStore } from '@/module/auth/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'nextjs-toploader/app';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { authService } from '../../../services';

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

export const SigninForm = () => {
  const router = useRouter();
  const { handleSaveToken, handleLogOut } = useAuthStore();
  const mutation = useCustomMutation<{
    access_token: string;
  }>();
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
    mutation.mutate(authService.signin(values), {
      onError(error) {
        handleLogOut();
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess(data) {
        const token = data?.access_token;
        if (token) {
          // handleSaveToken({ accessToken: token });
          // router.push(ORGANIZER_APP_ROUTES.dashboard.root());
        } else {
          toast.error('Something went wrong');
        }
      }
    });
  };

  const { email, password } = errors;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        disabled={mutation.isPending}
        className="flex flex-col gap-[1.86rem]"
      >
        {/* Email */}
        <div>
          <Input
            type="email"
            label="Company email"
            placeholder="example@gmail.com"
            hasError={!!email?.message?.length}
            {...register('email')}
          />
          <ErrorText message={email?.message} />
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            {...register('password')}
            showInfo={false}
            hasError={!!password?.message?.length}
          />
          <ErrorText message={password?.message} />
        </div>

        <LoadingButton
          type="submit"
          variant="tertiary"
          className="rounded-full"
          disabled={mutation.isPending}
          isLoading={mutation.isPending}
        >
          Sign in
        </LoadingButton>
      </fieldset>
    </form>
  );
};
