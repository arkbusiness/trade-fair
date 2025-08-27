'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { CountrySelector } from '@/app/core/shared/components/molecules';
import {
  LoadingButton,
  OverlaySpinner,
  PasswordInput,
  PhoneNumberInput,
  ProfileImageUploader
} from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { useExhibitorAuthStore } from '@/app/module/auth/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useForm } from 'react-hook-form';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import * as yup from 'yup';
import { useExhibitorOnboarding } from '../../hooks/use-exhibitor-onboarding';
import { useEffect } from 'react';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { exhibitorAuthService } from '../../../services';
import { errorHandler } from '@/app/core/shared/utils';
import toast from 'react-hot-toast';

const validationSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  companyName: yup.string().trim().required('Company name is required'),
  contactName: yup.string().trim().required('Full name is required'),
  country: yup.string().trim().required('Country is required'),
  contactEmail: yup.string().trim().required('Email is required'),
  boothNumber: yup.string(),
  logo: yup.mixed().nullable(),
  contactPhone: yup
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

type ExhibitorSignupFormValues = yup.InferType<typeof validationSchema>;

interface IFormResponse {
  message: string;
  accessToken: string;
}

export const ExhibitorSignupForm = () => {
  const param = useParams();
  const token = (param?.token ?? '') as string;

  const { exhibitorOnboarding, isLoadingExhibitorOnboarding } =
    useExhibitorOnboarding(token);

  const { handleSaveToken } = useExhibitorAuthStore();
  const mutation = useCustomMutation<IFormResponse>();
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register
  } = useForm<ExhibitorSignupFormValues>({
    defaultValues: {
      username: '',
      companyName: '',
      contactName: '',
      country: 'Nigeria',
      contactEmail: '',
      contactPhone: '',
      confirmPassword: '',
      logo: null,
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (exhibitorOnboarding) {
      setValue('contactEmail', exhibitorOnboarding?.email);
      setValue('boothNumber', exhibitorOnboarding?.boothNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exhibitorOnboarding]);

  const onSubmit = (values: ExhibitorSignupFormValues) => {
    const {
      password,
      contactName,
      companyName,
      contactPhone,
      country,
      contactEmail,
      logo,
      username
    } = values;

    const formValues = {
      token,
      username,
      contactPhone: parsePhoneNumber(contactPhone)?.number as string,
      companyName,
      contactName,
      country,
      contactEmail,
      logo: logo as File,
      password
    };

    mutation.mutate(exhibitorAuthService.register(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess(data) {
        const successMessage = data?.message ?? 'User registered successfully.';
        const token = data?.accessToken ?? '';
        toast.success(successMessage);
        handleSaveToken({ accessToken: token });
        router.push(EXHIBITOR_APP_ROUTES.root());
      }
    });
  };

  const watchedPhoneNo = watch('contactPhone');
  const watchedCountry = watch('country');
  const {
    contactName: contactNameError,
    contactEmail: contactEmailError,
    contactPhone: contactPhoneError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
    companyName: companyNameError,
    country: countryError,
    username: usernameError
  } = errors;

  return (
    <>
      {isLoadingExhibitorOnboarding && (
        <OverlaySpinner overlayClassName="bg-foreground/5" />
      )}
      <form
        className="flex flex-col gap-[1.86rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className="flex flex-col gap-[1.86rem] w-full"
          disabled={mutation.isPending}
        >
          <div className="flex justify-center gap-4 items-center max-w-[25.94rem] w-full mx-auto flex-wrap">
            <div>
              <ProfileImageUploader
                avatarPlaceholder=""
                className="rounded-none border-2"
                onImageUpload={(file) => {
                  setValue('logo', file);
                }}
              />
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-xs font-medium text-text-foreground/60">
                Logo
              </p>
              <p className="text-foreground/60 font-medium text-xs">
                File size: 10MB
              </p>
              <p className="text-foreground/60 font-medium text-xs">
                Supported formats: .PNG, .JPG, .JPEG
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-[1.86rem]">
            {/* Company Name */}
            <div>
              <Input
                label="Company Name"
                placeholder="Enter your company name"
                hasError={!!companyNameError?.message?.length}
                {...register('companyName')}
              />
              <ErrorText message={companyNameError?.message} />
            </div>

            {/* Username */}
            <div>
              <Input
                label="Username"
                placeholder="Enter your username"
                hasError={!!usernameError?.message?.length}
                {...register('username')}
              />
              <ErrorText message={usernameError?.message} />
            </div>
          </div>

          {/* Contact Name */}
          <div>
            <Input
              label="Full name"
              placeholder="Enter your full name"
              hasError={!!contactNameError?.message?.length}
              {...register('contactName')}
            />
            <ErrorText message={contactNameError?.message} />
          </div>

          {/* Contact Email */}
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              hasError={!!contactEmailError?.message?.length}
              disabled={!!exhibitorOnboarding?.email}
              readOnly={!!exhibitorOnboarding?.email}
              inputClassName="text-burnt-orange disabled:opacity-100 disabled:bg-gray-light/20"
              {...register('contactEmail')}
            />
            <ErrorText message={contactEmailError?.message} />
          </div>

          {/* Booth Number */}
          <div>
            <Input
              label="Booth Number"
              placeholder="Enter your booth number"
              {...register('boothNumber')}
              disabled={!!exhibitorOnboarding?.boothNumber}
              readOnly={!!exhibitorOnboarding?.boothNumber}
              inputClassName="text-burnt-orange disabled:opacity-100 disabled:bg-gray-light/20"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-[1.86rem]">
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

            {/* Phone Number */}
            <PhoneNumberInput
              name="contactPhone"
              error={contactPhoneError?.message}
              value={watchedPhoneNo}
              onChange={(value) => {
                if (value) {
                  setValue('contactPhone', value, {
                    shouldValidate: true
                  });
                }
              }}
            />
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
          isLoading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Continue
        </LoadingButton>
      </form>
    </>
  );
};
