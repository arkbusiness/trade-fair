import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { settingsQueryKeys } from './settings-query-options';

export type UpdateInvoiceTemplatePayload = {
  id: string;
  additionalInformation?: string;
};

export type UpdateInvoiceTemplateResponse = {
  message: string;
};

export const useUpdateInvoiceTemplate = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateInvoiceTemplateResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateInvoiceTemplateResponse>();

  return {
    updateInvoiceTemplate: (payload: UpdateInvoiceTemplatePayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/templates/${payload.id}`,
          method: 'PATCH',
          data: {
            additionalInformation: payload.additionalInformation
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
