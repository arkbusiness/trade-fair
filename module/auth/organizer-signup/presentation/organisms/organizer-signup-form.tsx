'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { CountrySelector } from '@/app/core/shared/components/atoms/country-selector';
import {
  LoadingButton,
  PasswordInput,
  PhoneNumberInput
} from '@/app/core/shared/components/molecules';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { useSetParams } from '@/app/core/shared/hooks';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'nextjs-toploader/app';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import * as yup from 'yup';
import { organizerAuthService } from '../../../services';

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
  lastName: yup.string().trim().required('Last name is required'),
  country: yup.string().trim().required('Country is required'),
  phoneNumber: yup
    .string()
    .trim()
    .test({
      name: 'phone',
      message: 'Enter a valid phone number',
      test(value, ctx) {
        if (!value) {
          return ctx.createError({
            message: 'Phone number is required'
          });
        }

        return isPossiblePhoneNumber(value);
      }
    })
    .required('Phone number is required'),
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
export interface ISignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface ISignupFormResponse {
  message: string;
  token: string;
}

export const OrganizerSignupForm = () => {
  const { searchParamsObject } = useSetParams();
  const token = searchParamsObject['token'];
  // const { handleSaveToken } = useAuthStore();
  const mutation = useCustomMutation<ISignupFormResponse>();
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register
  } = useForm<ISignupFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: 'Nigeria',
      phoneNumber: '',
      confirmPassword: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (values: ISignupFormValues) => {
    const { password, firstName, lastName, email, phoneNumber, country } =
      values;

    const formValues = {
      token,
      firstName,
      lastName,
      email,
      country,
      phoneNumber: parsePhoneNumber(phoneNumber)?.number as string,
      password
    };

    mutation.mutate(organizerAuthService.register(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess(data) {
        const successMessage =
          data?.message ??
          'User registered successfully. Please verify your email.';
        // const token = data?.token ?? '';
        toast.success(successMessage);
        // handleSaveToken({ signupToken: token });
        router.push(ORGANIZER_APP_ROUTES.auth.onboarding());
      }
    });
  };

  const watchedPhoneNo = watch('phoneNumber');
  const watchedCountry = watch('country');
  const {
    email: emailError,
    firstName: firstNameError,
    lastName: lastNameError,
    phoneNumber: phoneNumberError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
    country: countryError
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
          {/* First Name */}
          <div>
            <Input
              label="First Name"
              placeholder="John"
              hasError={!!firstNameError?.message?.length}
              {...register('firstName')}
            />
            <ErrorText message={firstNameError?.message} />
          </div>

          {/* Last Name */}
          <div>
            <Input
              label="Last Name"
              placeholder="Doe"
              hasError={!!lastNameError?.message?.length}
              {...register('lastName')}
            />
            <ErrorText message={lastNameError?.message} />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-[1.86rem]">
          {/* Email */}
          <div>
            <Input
              type="email"
              label="Email Address"
              placeholder="example@gmail.com"
              hasError={!!emailError?.message?.length}
              {...register('email')}
            />
            <ErrorText message={emailError?.message} />
          </div>

          {/* Phone Number */}
          <PhoneNumberInput
            name="phoneNumber"
            error={phoneNumberError?.message}
            value={watchedPhoneNo}
            onChange={(value) => {
              if (value) {
                setValue('phoneNumber', value, {
                  shouldValidate: true
                });
              }
            }}
          />
        </div>

        {/* Country */}
        <div>
          <CountrySelector
            name="country"
            value={watchedCountry}
            onChange={(value) => {
              if (value) {
                setValue('country', value, {
                  shouldValidate: true
                });
              }
            }}
            hasError={!!countryError?.message?.length}
            label="Country"
          />

          <ErrorText message={countryError?.message} />
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            hasError={!!passwordError?.message?.length}
            {...register('password')}
          />
          <ErrorText message={passwordError?.message} />
        </div>

        {/* Confirm Password */}
        <div>
          <PasswordInput
            hasError={!!confirmPasswordError?.message?.length}
            {...register('confirmPassword')}
          />
          <ErrorText message={confirmPasswordError?.message} />
        </div>
      </fieldset>

      <LoadingButton
        type="submit"
        variant="tertiary"
        isLoading={mutation.isPending}
        disabled={mutation.isPending}
      >
        Continue
      </LoadingButton>
    </form>
  );
};
