import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallMethods } from '@/app/core/shared/types';

export type CatalogueFavouriteParams = {
  productId: string;
};

export const useAddCatalogueToFavourite = ({
  productId,
  onSuccess,
  onError
}: CatalogueFavouriteParams & ApiCallMethods<void>) => {
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
}: CatalogueFavouriteParams & ApiCallMethods<void>) => {
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
