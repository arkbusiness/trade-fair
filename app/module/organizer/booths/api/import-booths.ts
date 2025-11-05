import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { boothsQueryKeys } from './booths-query-options';

export type ImportBoothsPayload = {
  file: File;
};

export type ImportBoothsResponse = {
  message: string;
};

export const useImportBooths = ({
  onSuccess,
  onError
}: ApiCallbacks<ImportBoothsResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<ImportBoothsResponse>();

  return {
    importBooths: (payload: ImportBoothsPayload) =>
      mutation.mutate(
        {
          url: '/organizer/booths/import',
          method: 'POST',
          data: { file: payload.file },
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [boothsQueryKeys.base]
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
