import { ErrorText, Textarea } from '@/app/core/shared/components/atoms';
import {
  LoadingButton,
  OverlaySpinner,
  ProfileImageUploader
} from '@/app/core/shared/components/molecules';
import { useExhibitorUser } from '@/app/core/shared/hooks/api/use-exhibitor-user';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useInvoiceTemplates } from '../../hooks/use-settings';
import { exhibitorSettingsService } from '../../services';

const validationSchema = yup.object().shape({
  additionalInformation: yup.string()
});

type IExhibitorInvoiceInfoFormValues = yup.InferType<typeof validationSchema>;

export const ExhibitorInvoiceInfoForm = () => {
  const { user } = useExhibitorUser();
  const {
    refetchInvoiceTemplates,
    invoiceTemplates,
    isLoadingInvoiceTemplates,
    isRefetchingInvoiceTemplates
  } = useInvoiceTemplates();

  const mutation = useCustomMutation();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<IExhibitorInvoiceInfoFormValues>({
    values: {
      additionalInformation: invoiceTemplates?.additionalInformation || ''
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const onCreateInvoiceTemplate = (data: IExhibitorInvoiceInfoFormValues) => {
    mutation.mutate(
      exhibitorSettingsService.createInvoiceTemplate({
        additionalInformation: data.additionalInformation || ''
      }),
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          toast.success('Invoice template created successfully');
          refetchInvoiceTemplates();
        }
      }
    );
  };

  const onUpdateInvoiceTemplate = (data: IExhibitorInvoiceInfoFormValues) => {
    if (!invoiceTemplates?.id) return;
    mutation.mutate(
      exhibitorSettingsService.updateInvoiceTemplate(
        invoiceTemplates.id || '',
        {
          additionalInformation: data.additionalInformation || ''
        }
      ),
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          toast.success('Invoice template updated successfully');
          refetchInvoiceTemplates();
        }
      }
    );
  };

  const onSubmit = (data: IExhibitorInvoiceInfoFormValues) => {
    const formValues = {
      additionalInformation: data.additionalInformation || ''
    };

    if (invoiceTemplates && invoiceTemplates.id) {
      onUpdateInvoiceTemplate(formValues);
    } else {
      onCreateInvoiceTemplate(formValues);
    }
  };

  console.log(invoiceTemplates);

  const isLoading =
    isLoadingInvoiceTemplates ||
    isRefetchingInvoiceTemplates ||
    mutation.isPending;

  return (
    <>
      {isLoading && <OverlaySpinner />}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-foreground">
              Invoice Information
            </h3>
            <p className="text-sm font-light">
              Update your invoice information here.
            </p>
          </div>

          <div>
            <LoadingButton
              variant="tertiary"
              className="h-[35px]"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {invoiceTemplates ? 'Update' : 'Save'} changes
            </LoadingButton>
          </div>
        </div>
        <fieldset
          className="w-full px-3 flex flex-col gap-6 mt-6"
          disabled={mutation.isPending}
        >
          {/* Logo */}
          <div className="flex flex-col gap-1 items-center py-6 border-t">
            <p className="text-sm font-semibold mb-2">Company logo</p>
            <ProfileImageUploader
              avatarPlaceholder="/images/empty-image.svg"
              disableUpload={true}
              user={{
                photoUrl: user?.logoUrl ?? '',
                name: user?.companyName ?? ''
              }}
              className="rounded-lg border-input"
              imageClassName="rounded-lg"
            />
          </div>

          {/* Additional information */}
          <div className="w-full border-t">
            <div className="grid md:grid-cols-[16.5rem_1fr] gap-x-8 w-full py-6">
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Additional information</p>
                <p className="text-sm font-light">
                  Write any information about the invoice
                </p>
              </div>
              <div className="max-w-[32rem] w-full">
                <Textarea
                  label="Additional information"
                  labelClassName="md:hidden"
                  placeholder="e.g. duties & taxes, handling charges, and other related costs"
                  rows={8}
                  disabled={isLoading}
                  {...register('additionalInformation')}
                />
                <ErrorText message={errors.additionalInformation?.message} />
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};
