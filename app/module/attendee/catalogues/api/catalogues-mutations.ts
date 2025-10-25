import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallMethods } from '@/app/core/shared/types';

export type CataloguesParams = {
  productId: string;
};

export type RequestInvoicePayload = {
  productId: string;
  quantity: number;
  price: number;
};

export const useAddCatalogueToFavourite = ({
  productId,
  onSuccess,
  onError
}: CataloguesParams & ApiCallMethods<void>) => {
  const mutation = useCustomMutation();

  return {
    addToFavouriteMutation: () =>
      mutation.mutate(
        {
          url: `/attendee/product-favorite/${productId}`,
          method: 'POST'
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

export const useRemoveCatalogueFromFavourite = ({
  productId,
  onSuccess,
  onError
}: CataloguesParams & ApiCallMethods<void>) => {
  const mutation = useCustomMutation();

  return {
    removeFromFavouriteMutation: () =>
      mutation.mutate(
        {
          url: `/attendee/product/${productId}`,
          method: 'DELETE'
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

export const useRequestInvoice = ({
  onSuccess,
  onError
}: ApiCallMethods<void>) => {
  const mutation = useCustomMutation();

  return {
    requestInvoiceMutation: (payload: { items: RequestInvoicePayload[] }) =>
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
