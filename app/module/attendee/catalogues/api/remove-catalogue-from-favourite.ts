import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { useQueryClient } from '@tanstack/react-query';
import { catalogueListsQueryKeys } from './get-catalogues';
import { ApiCallbacks } from '@/app/core/shared/types';
import { favouriteCataloguesQueryKeys } from './get-favourite-catalogues';

export const useRemoveCatalogueToFavourite = ({
  onSuccess,
  onError
}: ApiCallbacks<void>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation();

  return {
    removeFromFavouriteMutation: (productId: string) => {
      mutation.mutate(
        {
          url: `/attendee/product/${productId}`,
          method: 'DELETE'
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
