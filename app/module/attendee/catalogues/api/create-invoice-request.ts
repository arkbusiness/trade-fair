import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type CataloguesParams = {
  productId: string;
};

export type RequestInvoicePayload = {
  productId: string;
  quantity: number;
  price: number;
};

export const useRequestInvoice = ({
  onSuccess,
  onError
}: ApiCallbacks<void>) => {
  const mutation = useCustomMutation();

  return {
    requestInvoiceMutation: (payload: {
      items: RequestInvoicePayload[];
      currency: string;
    }) =>
      mutation.mutate(
        {
          url: `/attendee/order`,
          method: 'POST',
          data: payload
        },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: (error) => {
            onError(error);
          }
        }
      ),
    isPending: mutation.isPending
  };
};
