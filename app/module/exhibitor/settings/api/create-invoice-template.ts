import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { settingsQueryKeys } from './settings-query-options';

export type CreateInvoiceTemplatePayload = {
  additionalInformation?: string;
};

export type CreateInvoiceTemplateResponse = {
  message: string;
};

export const useCreateInvoiceTemplate = ({
  onSuccess,
  onError
}: ApiCallbacks<CreateInvoiceTemplateResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<CreateInvoiceTemplateResponse>();

  return {
    createInvoiceTemplate: (payload: CreateInvoiceTemplatePayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/invoice-template`,
          method: 'POST',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: settingsQueryKeys.invoiceTemplates.all
            });
            onSuccess(data);
          },
          onError: (error) => {
            onError(error);
          }
        }
      ),
    isPending: mutation.isPending
  };
};
