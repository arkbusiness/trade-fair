'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card,
  CardContent,
  ErrorText,
  Input
} from '@/app/core/shared/components/atoms';
import { useAttendeeUser } from '@/app/core/shared/hooks/api';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { AttendeeSettingsHeader } from './attendee-settings-header';
import {
  CurrencySelector,
  LoadingButton,
  PhoneNumberInput
} from '@/app/core/shared/components/molecules';
import { errorHandler } from '@/app/core/shared/utils';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  address: yup.string().required('Address is required'),
  username: yup.string().required('Username is required'),
  contactName: yup.string().required('Full name is required'),
  currency: yup.string().trim().required('Currency is required'),
  phone: yup
    .string()
    .trim()
    .test({
      name: 'phone',
      message: 'Enter a valid phone number',
      test(value) {
        return value ? isPossiblePhoneNumber(value) : true;
      }
    })
});

type FormValues = yup.InferType<typeof validationSchema> & {
  file?: File | null;
};

export const AttendeeSettingsForm = () => {
  const mutation = useCustomMutation();
  const { user, refetchUser, currency } = useAttendeeUser();
  const {
    setValue,
    watch,
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as never,
    defaultValues: {
      email: user?.email || '',
      address: user?.address || '',
      contactName: user?.contactName || '',
      phone: user?.phone || '',
      file: null,
      currency: currency,
      username: user?.username || ''
    }
  });

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();

    const formValues = {
      email: values.email,
      address: values.address,
      username: values.username,
      contactName: values.contactName,
      currency: values.currency,
      phone: values.phone
        ? (parsePhoneNumber(values.phone)?.number as string)
        : ''
    };

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (values.file) {
      formData.append('file', values.file);
    }

    mutation.mutate(
      {
        url: '/attendee/profile',
        method: 'PATCH',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          refetchUser();
          toast.success('Profile updated successfully');
        }
      }
    );
  };

  const watchedCurrency = watch('currency');
  const watchedPhoneNo = watch('phone');

  const {
    username: usernameError,
    email: emailError,
    address: addressError,
    contactName: contactNameError,
    currency: currencyError,
    phone: contactPhoneError
  } = errors;

  return (
    <>
      <form
        className="flex flex-col gap-[1.86rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className="flex flex-col gap-[1.86rem] w-full"
          disabled={mutation.isPending}
        >
          <AttendeeSettingsHeader
            handleImageUpload={(file) => {
              setValue('file', file);
            }}
          />

          <div className="grid lg:grid-cols-[260px_1fr] gap-8 px-6 md:px-12">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Personal info
              </h3>
              <p className="text-sm font-normal">
                Update your photo and personal details
              </p>
            </div>

            <Card>
              <CardContent className="gap-4 p-6">
                {/* Contact Name & Email */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
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

                  {/* Email  */}
                  <div>
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      hasError={!!emailError?.message?.length}
                      {...register('email')}
                    />
                    <ErrorText message={emailError?.message} />
                  </div>
                </div>

                {/* Username & Phone */}
                <div className="grid lg:grid-cols-2 gap-6">
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

                  {/* Phone */}
                  <PhoneNumberInput
                    name="phone"
                    error={contactPhoneError?.message}
                    value={watchedPhoneNo}
                    onChange={(value) => {
                      if (value) {
                        setValue('phone', value, {
                          shouldValidate: true
                        });
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Others */}
          <Card className="border-0 rounded-none">
            <CardContent className="gap-4 p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Currency */}
                <div>
                  <CurrencySelector
                    name="currency"
                    value={watchedCurrency}
                    onChange={(value) => {
                      if (value) {
                        setValue('currency', value, {
                          shouldValidate: true
                        });
                      }
                    }}
                    hasError={!!currencyError?.message?.length}
                    label="Currency"
                  />
                  <ErrorText message={currencyError?.message} />
                </div>

                {/* Address */}
                <div>
                  <Input
                    label="Address"
                    placeholder="Enter your address"
                    hasError={!!addressError?.message?.length}
                    {...register('address')}
                  />
                  <ErrorText message={addressError?.message} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end px-6 md:px-12">
            <LoadingButton
              type="submit"
              variant="tertiary"
              isLoading={mutation.isPending}
              disabled={mutation.isPending}
            >
              Save changes
            </LoadingButton>
          </div>
        </fieldset>
      </form>
    </>
  );
};
