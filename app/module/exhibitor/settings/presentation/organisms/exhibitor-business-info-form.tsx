import { ErrorText, Input, Textarea } from '@/app/core/shared/components/atoms';
import {
  CountrySelector,
  CurrencySelector,
  LoadingButton,
  ProfileImageUploader
} from '@/app/core/shared/components/molecules';
import { useExhibitorUser } from '@/app/core/shared/hooks/api/use-exhibitor-user';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { exhibitorSettingsService } from '../../services';
import { COUNTRY_DETAILS } from '@/app/core/shared/constants';

const validationSchema = yup.object().shape({
  publicDescription: yup.string(),
  companyName: yup.string().trim(),
  country: yup.string().trim(),
  currency: yup.string().trim(),
  websiteUrl: yup.string().url('Invalid URL'),
  file: yup.mixed().nullable()
});

type IExhibitorBusinessInfoFormValues = yup.InferType<typeof validationSchema>;

export const ExhibitorBusinessInfoForm = () => {
  const { user, refetchUser } = useExhibitorUser();

  const mutation = useCustomMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<IExhibitorBusinessInfoFormValues>({
    defaultValues: {
      publicDescription: user?.publicDescription ?? '',
      companyName: user?.companyName ?? '',
      country: user?.country ?? '',
      currency: user?.currency ?? '',
      websiteUrl: user?.websiteUrl ?? ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: IExhibitorBusinessInfoFormValues) => {
    const formValues = {
      publicDescription: data.publicDescription || '',
      websiteUrl: data.websiteUrl || '',
      companyName: data.companyName || '',
      country: data.country || null,
      currency: data.currency || null,
      file: data.file as File | null
    };

    mutation.mutate(exhibitorSettingsService.updateBusinessInfo(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Business information updated successfully');
        refetchUser();
      }
    });
  };

  const watchedCurrency = watch('currency') ?? '';
  const watchedCountry = watch('country') ?? '';

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">
            Business Information
          </h3>
          <p className="text-sm font-light">
            Update your business logo and information here.
          </p>
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
        <div className="flex flex-col gap-1 items-center">
          <p className="text-sm font-semibold mb-2">Company logo</p>
          <ProfileImageUploader
            onImageUpload={(file: File | null) => {
              setValue('file', file);
            }}
            avatarPlaceholder="/images/empty-image.svg"
            user={{
              photoUrl: user?.logoUrl ?? '',
              name: user?.companyName ?? ''
            }}
            className="rounded-lg border-input"
            imageClassName="rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full border-y py-6">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Email</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <Input
              label="Email"
              labelClassName="md:hidden"
              value={user?.contactEmail ?? ''}
              readOnly
              disabled
              inputClassName="bg-gray-light"
            />
          </div>
        </div>

        {/* Booth number */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full border-y py-6">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Booth number</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <Input
              label="Booth number"
              labelClassName="md:hidden"
              value={user?.boothNumber ?? ''}
              readOnly
              disabled
              inputClassName="bg-gray-light"
            />
          </div>
        </div>

        {/* Booth name */}
        {/* <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full  py-6">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Booth name</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <Input
              label="Booth name"
              labelClassName="md:hidden"
              value={user?.boothName ?? ''}
              {...register('boothName')}
            />
          </div>
        </div> */}

        {/* Company name */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full  py-6 border-t">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Company name</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <Input
              label="Company name"
              labelClassName="md:hidden"
              {...register('companyName')}
            />
            <ErrorText message={errors.companyName?.message} />
          </div>
        </div>

        {/* Country */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full  py-6 border-t">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Country</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <CountrySelector
              name="country"
              labelClassName="md:hidden"
              value={watchedCountry}
              onChange={(value) => {
                if (value) {
                  const country = value.toLowerCase();
                  const countryDetails =
                    COUNTRY_DETAILS[country as keyof typeof COUNTRY_DETAILS];

                  if (countryDetails && countryDetails.currency) {
                    setValue('currency', countryDetails.currency, {
                      shouldValidate: true
                    });
                  }

                  setValue('country', value, {
                    shouldValidate: true
                  });
                }
              }}
              hasError={!!errors.country?.message?.length}
              label="Country"
            />
          </div>
        </div>

        {/* Currency */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full py-6 border-y">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Currency</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <CurrencySelector
              name="currency"
              labelClassName="md:hidden"
              value={watchedCurrency}
              onChange={(value) => {
                if (value) {
                  setValue('currency', value, {
                    shouldValidate: true
                  });
                }
              }}
              hasError={!!errors.currency?.message?.length}
              label="Currency"
            />
          </div>
        </div>

        {/* Website */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full py-6 border-y">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Website</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <Input
              label="Website"
              labelClassName="md:hidden"
              placeholder="eg. https://www.example.com"
              hasError={!!errors.websiteUrl?.message?.length}
              {...register('websiteUrl')}
            />
            <ErrorText message={errors.websiteUrl?.message} />
          </div>
        </div>

        {/* About */}
        <div className="w-full">
          <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full py-6">
            <div className="hidden md:block">
              <p className="text-sm font-semibold">About</p>
              <p className="text-sm font-light">
                Write a short story about your company.
              </p>
            </div>
            <div className="max-w-[32rem] w-full">
              <Textarea
                label="Description"
                placeholder="Enter product description"
                rows={8}
                {...register('publicDescription')}
              />
              <ErrorText message={errors.publicDescription?.message} />
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
};
