import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { orderQueryKeys } from './order-query-options';

export type UpdateOrderTrackingPayload = {
  orderId: string;
  tracking: {
    courier: string;
    name: string;
    code: string;
    status?: string;
    phone: string;
    note: string;
  };
};

export type UpdateOrderTrackingResponse = {
  message: string;
};

export const useUpdateOrderTracking = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateOrderTrackingResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateOrderTrackingResponse>();

  return {
    updateOrderTracking: (payload: UpdateOrderTrackingPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/orders/${payload.orderId}/tracking`,
          method: 'PATCH',
          data: payload.tracking
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: [orderQueryKeys.base]
            });
            queryClient.invalidateQueries({
              queryKey: orderQueryKeys.detail(payload.orderId)
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
