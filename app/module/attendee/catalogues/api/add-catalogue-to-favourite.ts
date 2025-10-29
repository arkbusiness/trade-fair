import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { useQueryClient } from '@tanstack/react-query';
import { catalogueListsQueryKeys } from './get-catalogue-list';
import { ApiCallbacks } from '@/app/core/shared/types';
import { favouriteCataloguesQueryKeys } from './get-favourite-catalogue-list';

export const useAddCatalogueToFavourite = ({
  onSuccess,
  onError
}: ApiCallbacks<void>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation();

  return {
    addToFavouriteMutation: (productId: string) => {
      mutation.mutate(
        {
          url: `/attendee/product-favorite/${productId}`,
          method: 'POST'
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [catalogueListsQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: [favouriteCataloguesQueryKeys.base]
            });
            onSuccess();
          },
          onError: (error) => {
            onError(error);
          }
        }
      );
    },
    isLoading: mutation.isPending
  };
};
