import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { ApiCallbacks } from '@/app/core/shared/types';

export type UpdatePaymentPayload = {
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
};

export type UpdatePaymentResponse = {
  message: string;
};

export const useUpdatePayment = ({
  onSuccess,
  onError
}: ApiCallbacks<UpdatePaymentResponse>) => {
  const mutation = useCustomMutation<UpdatePaymentResponse>();

  return {
    updatePayment: (payload: UpdatePaymentPayload) =>
      mutation.mutate(
        {
          url: `/exhibitor/exhibitors/payment-details`,
          method: 'PUT',
          data: payload
        },
        {
          onSuccess: (data) => {
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
