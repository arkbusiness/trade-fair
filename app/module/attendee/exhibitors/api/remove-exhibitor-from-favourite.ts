import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeeOverviewQueryKeys } from '../../overview/api';
import {
  attendeeExhibitorsQueryKeys,
  attendeeFavouriteExhibitorsQueryKeys
} from './exhibitor-query-options';

export type RemoveExhibitorFromFavouritePayload = {
  exhibitorId: string;
};

export type RemoveExhibitorFromFavouriteResponse = {
  message: string;
};

export const useRemoveExhibitorFromFavourite = ({
  onSuccess,
  onError
}: ApiCallbacks<RemoveExhibitorFromFavouriteResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<RemoveExhibitorFromFavouriteResponse>();

  return {
    removeFromFavouriteMutation: (
      payload: RemoveExhibitorFromFavouritePayload
    ) =>
      mutation.mutate(
        {
          url: `/attendee/exhibitor/${payload.exhibitorId}/favorite`,
          method: 'DELETE'
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [attendeeExhibitorsQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: [attendeeFavouriteExhibitorsQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: [attendeeOverviewQueryKeys.base]
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
