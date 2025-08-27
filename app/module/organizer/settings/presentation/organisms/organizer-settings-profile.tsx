'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import {
  CountrySelector,
  LoadingButton,
  PhoneNumberInput,
  ProfileImageUploader
} from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { useOrganizerUser } from '@/app/core/shared/hooks/api';
import { organizerUserService } from '@/app/core/shared/services';
import { errorHandler } from '@/app/core/shared/utils';

const validationSchema = yup.object().shape({
  contactName: yup.string().trim().required('Name is required'),
  officialEmail: yup.string().trim().required('Email is required'),
  companyName: yup.string().trim().required('Company name is required'),
  country: yup.string().trim().required('Country is required'),
  file: yup.mixed().nullable(),
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
    .required('Phone number is required')
});

type IProfileFormValues = yup.InferType<typeof validationSchema>;

export const OrganizerSettingsProfile = () => {
  const { user, refetchUser } = useOrganizerUser();
  const mutation = useCustomMutation();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register
  } = useForm<IProfileFormValues>({
    values: {
      contactName: user?.contactName ?? '',
      officialEmail: user?.officialEmail ?? '',
      country: user?.country ?? 'Nigeria',
      file: null,
      contactPhone: user?.contactPhone
        ? (parsePhoneNumber(user?.contactPhone)?.number as string)
        : '',
      companyName: user?.companyName ?? ''
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const watchedPhoneNo = watch('contactPhone');
  const watchedCountry = watch('country');
  const {
    contactName: nameError,
    officialEmail: emailError,
    companyName: companyNameError,
    country: countryError,
    contactPhone: phoneError
  } = errors;

  const onSubmit = (values: IProfileFormValues) => {
    mutation.mutate(
      organizerUserService.updateUser({
        ...values,
        file: values.file as File | null
      }),
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          toast.success('Profile updated successfully');
          refetchUser();
        }
      }
    );
  };

  return (
    <>
      <div className="px-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">
            {' '}
            Personal info
          </h3>
          <p className="text-sm font-light">
            Update your photo and personal details here
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <fieldset className="w-full px-8" disabled={mutation.isPending}>
            <div className="flex items-center gap-4 mb-7 relative  flex-col">
              <div className="w-[clamp(100px,_30vw,_160px)] h-[clamp(100px,_30vw,_160px)] overflow-hidden">
                <ProfileImageUploader
                  user={{
                    photoUrl: user?.logo || '',
                    name: user?.contactName
                  }}
                  onImageUpload={(file: File) => {
                    setValue('file', file);
                  }}
                />
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-semibold text-foreground">
                  {user?.contactName ?? 'N/A'}
                </h4>
                <p className="text-sm font-light">
                  {user?.officialEmail ?? 'N/A'}
                </p>
              </div>
            </div>
            {/* Name */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full border-y py-6">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Name</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <Input
                  label="Name"
                  labelClassName="md:hidden"
                  placeholder="Enter your name"
                  hasError={!!nameError?.message?.length}
                  {...register('contactName')}
                />
                <ErrorText message={nameError?.message} />
              </div>
            </div>

            {/* Email */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full border-b py-6">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Email address</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <Input
                  label="Email"
                  labelClassName="md:hidden"
                  placeholder="Enter your email"
                  readOnly
                  disabled
                  hasError={!!emailError?.message?.length}
                  {...register('officialEmail')}
                />
                <ErrorText message={emailError?.message} />
              </div>
            </div>

            {/* Phone */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full border-b py-6">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Phone number</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <PhoneNumberInput
                  name="phone"
                  error={phoneError?.message}
                  labelClassName="md:hidden"
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
            </div>

            {/* Company Name */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full border-b py-6">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Company name</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
                <Input
                  label="Company name"
                  labelClassName="md:hidden"
                  placeholder="Enter your company name"
                  hasError={!!companyNameError?.message?.length}
                  {...register('companyName')}
                />
                <ErrorText message={companyNameError?.message} />
              </div>
            </div>

            {/* Country */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 max-w-[55.43rem] w-full py-6 border-b">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Country</p>
              </div>
              <div className="max-w-[25.43rem] w-full">
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
                  labelClassName="md:hidden"
                />

                <ErrorText message={countryError?.message} />
              </div>
            </div>
          </fieldset>
          <div className="flex justify-end max-w-[55.43rem] w-full mt-6">
            <LoadingButton
              type="submit"
              variant="tertiary"
              className="h-10 rounded-[8px]"
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
            >
              Save changes
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};
