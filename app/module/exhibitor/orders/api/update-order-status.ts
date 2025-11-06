import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { orderQueryKeys } from './order-query-options';
import type { OrderStatus } from './types';

export type UpdateOrderStatusPayload = {
  orderId: string;
  status: OrderStatus;
};

export type UpdateOrderStatusResponse = {
  message: string;
};

export const useUpdateOrderStatus = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdateOrderStatusResponse>) => {
  const queryClient = useQueryClient();
  const mutation = useCustomMutation<UpdateOrderStatusResponse>();

  return {
    updateOrderStatus: (payload: UpdateOrderStatusPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/orders/${payload.orderId}/status`,
          method: 'PATCH',
          data: {
            status: payload.status
          }
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
