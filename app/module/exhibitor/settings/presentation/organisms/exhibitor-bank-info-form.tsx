'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton } from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { exhibitorSettingsService } from '../../services';
import { useExhibitorUser } from '@/app/core/shared/hooks/api/use-exhibitor-user';

const validationSchema = yup.object().shape({
  bankName: yup.string().required('Bank name is required'),
  bankAccountName: yup.string().required('Bank account name is required'),
  bankAccountNumber: yup
    .string()
    .required('Bank account number is required')
    .matches(/^[0-9]+$/, 'Bank account number must contain only digits')
    .min(8, 'Bank account number must be at least 8 digits')
    .max(20, 'Bank account number must not exceed 20 digits')
});

type IFormValues = yup.InferType<typeof validationSchema>;

export const ExhibitorBankInfoForm = () => {
  const mutation = useCustomMutation();
  const { user } = useExhibitorUser();

  const bankDetails = user?.PaymentDetails?.[0];

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<IFormValues>({
    defaultValues: {
      bankName: bankDetails?.bankName || '',
      bankAccountName: bankDetails?.bankAccountName || '',
      bankAccountNumber: bankDetails?.bankAccountNumber || ''
    },
    resolver: yupResolver(validationSchema)
  });

  const {
    bankName: bankNameError,
    bankAccountName: bankAccountNameError,
    bankAccountNumber: bankAccountNumberError
  } = errors;

  const onSubmit = (values: IFormValues) => {
    const formValues = {
      bankName: values.bankName,
      bankAccountName: values.bankAccountName,
      bankAccountNumber: values.bankAccountNumber
    };
    mutation.mutate(exhibitorSettingsService.updatePayment(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Bank info updated successfully');
      }
    });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-foreground">Bank info</h3>
            <p className="text-sm font-light">Update your bank info here.</p>
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
              <p className="text-sm font-semibold">Bank name</p>
            </div>
            <div className="max-w-[25.43rem] w-full">
              <Input
                label="Bank name"
                placeholder="Everest Bank"
                hasError={!!bankNameError?.message?.length}
                {...register('bankName')}
              />
              <ErrorText message={bankNameError?.message} />
            </div>
          </div>

          {/* Bank account name */}
          <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full border-t  py-6">
            <div className="hidden md:block">
              <p className="text-sm font-semibold">Bank account name</p>
            </div>
            <div className="max-w-[25.43rem] w-full">
              <Input
                label="Bank account name"
                placeholder="Enter bank account name"
                hasError={!!bankAccountNameError?.message?.length}
                {...register('bankAccountName')}
              />
              <ErrorText message={bankAccountNameError?.message} />
            </div>
          </div>

          {/* Bank account number */}
          <div className="grid md:grid-cols-[12.5rem_1fr] gap-x-8 w-full py-6 border-t">
            <div className="hidden md:block">
              <p className="text-sm font-semibold">Bank account number</p>
            </div>
            <div className="max-w-[25.43rem] w-full">
              <Input
                label="Bank account number"
                hasError={!!bankAccountNumberError?.message?.length}
                {...register('bankAccountNumber')}
              />
              <ErrorText message={bankAccountNumberError?.message} />
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};
