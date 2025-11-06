import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { attendeeOrderByIdQueryKeys } from './order-query-options';

export type UploadOrderReceiptPayload = FormData;

export type UploadOrderReceiptResponse = {
  message: string;
};

export const useUploadOrderReceipt = ({
  orderId,
  onSuccess,
  onError
}: {
  orderId: string;
} & ApiCallbacks<UploadOrderReceiptResponse>) => {
  const mutation = useCustomMutation<UploadOrderReceiptResponse>();
  const queryClient = useQueryClient();

  return {
    uploadReceipt: (data: UploadOrderReceiptPayload) =>
      mutation.mutate(
        {
          url: `/attendee/order/${orderId}/payment-slip`,
          method: 'PUT',
          data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [attendeeOrderByIdQueryKeys.base]
            });
            onSuccess?.(data);
          },
          onError
        }
      ),
    isPending: mutation.isPending
  };
};
