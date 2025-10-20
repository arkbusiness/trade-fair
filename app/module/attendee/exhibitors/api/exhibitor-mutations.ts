import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallMethods } from '@/app/core/shared/types';

export type ExhibitorFavouriteParams = {
  exhibitorId: string;
};

export const useAddExhibitorToFavourite = ({
  exhibitorId,
  onSuccess,
  onError
}: ExhibitorFavouriteParams & ApiCallMethods<void>) => {
  const mutation = useCustomMutation();

  return {
    addToFavouriteMutation: () =>
      mutation.mutate(
        {
          url: `/attendee/exhibitor/${exhibitorId}/favorite`,
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

export const useRemoveExhibitorFromFavourite = ({
  exhibitorId,
  onSuccess,
  onError
}: ExhibitorFavouriteParams & ApiCallMethods<void>) => {
  const mutation = useCustomMutation();

  return {
    removeFromFavouriteMutation: () =>
      mutation.mutate(
        {
          url: `/attendee/exhibitor/${exhibitorId}/favorite`,
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
