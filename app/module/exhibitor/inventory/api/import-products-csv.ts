import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { productQueryKeys } from './product-query-options';

export type ImportProductsCsvPayload = {
  file: File;
};

export type ImportProductsCsvResponse = {
  message: string;
  data: {
    imported: number;
    failed: number;
  };
};

export const useImportProductsCsv = ({
  onSuccess,
  onError
}: ApiCallbacks<ImportProductsCsvResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<ImportProductsCsvResponse>();

  return {
    importProductsCsv: (payload: ImportProductsCsvPayload) =>
      mutation.mutate(
        {
          url: '/exhibitor/products-csv-import',
          method: 'POST',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [productQueryKeys.base]
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
