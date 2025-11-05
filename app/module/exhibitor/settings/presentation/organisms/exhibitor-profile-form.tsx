import { Input } from '@/app/core/shared/components/atoms';
import {
  LoadingButton,
  PhoneNumberInput
} from '@/app/core/shared/components/molecules';
import { useExhibitorUser } from '@/app/core/shared/hooks/api/use-exhibitor-user';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  isPossiblePhoneNumber,
  parsePhoneNumber
} from 'react-phone-number-input';
import * as yup from 'yup';
import { useUpdateProfile } from '../../api';

const validationSchema = yup.object().shape({
  contactName: yup.string().trim(),
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
});

type IExhibitorProfileFormValues = yup.InferType<typeof validationSchema>;

export const ExhibitorProfileForm = () => {
  const { user } = useExhibitorUser();

  const { updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<IExhibitorProfileFormValues>({
    defaultValues: {
      contactName: user?.contactName ?? '',
      contactPhone: user?.contactPhone ?? ''
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: IExhibitorProfileFormValues) => {
    updateProfile({
      contactName: data.contactName ?? '',
      contactPhone: data.contactPhone
        ? parsePhoneNumber(data.contactPhone)?.number
        : ''
    });
  };

  const watchedPhoneNo = watch('contactPhone');

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">My Profile</h3>
          <p className="text-sm font-light">
            Update your personal details here.
          </p>
        </div>

        <div>
          <LoadingButton
            variant="tertiary"
            className="h-[35px]"
            type="submit"
            isLoading={isPending}
            disabled={isPending}
          >
            Save changes
          </LoadingButton>
        </div>
      </div>
      <fieldset
        className="w-full px-8 flex flex-col gap-6 mt-6"
        disabled={isPending}
      >
        {/* Full name */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full border-t  py-6">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Full name</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <Input
              label="Full name"
              labelClassName="md:hidden"
              {...register('contactName')}
            />
          </div>
        </div>

        {/* Phone number */}
        <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full py-6 border-t">
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Phone number</p>
          </div>
          <div className="max-w-[32rem] w-full">
            <PhoneNumberInput
              label="Phone number"
              name="contactPhone"
              labelClassName="md:hidden"
              error={errors.contactPhone?.message}
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
      </fieldset>
    </form>
  );
};
