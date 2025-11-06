import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeeOverviewQueryKeys } from '../../overview/api';
import {
  attendeeExhibitorsQueryKeys,
  attendeeFavouriteExhibitorsQueryKeys
} from './exhibitor-query-options';

export type AddExhibitorToFavouritePayload = {
  exhibitorId: string;
};

export type AddExhibitorToFavouriteResponse = {
  message: string;
};

export const useAddExhibitorToFavourite = ({
  onSuccess,
  onError
}: ApiCallbacks<AddExhibitorToFavouriteResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<AddExhibitorToFavouriteResponse>();

  return {
    addToFavouriteMutation: (payload: AddExhibitorToFavouritePayload) =>
      mutation.mutate(
        {
          url: `/attendee/exhibitor/${payload.exhibitorId}/favorite`,
          method: 'POST'
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
