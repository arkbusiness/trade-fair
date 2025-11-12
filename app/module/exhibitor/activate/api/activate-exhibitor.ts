import { ApiCallbacks } from '@/app/core/shared/types';
import { environment } from '@/app/core/shared/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type ActivateExhibitorPayload = {
  userId: string;
  password: string;
  accessToken: string;
};

export type ActivateExhibitorResponse = {
  message: string;
  accessToken: string;
};

const activateExhibitor = async (
  payload: ActivateExhibitorPayload
): Promise<ActivateExhibitorResponse> => {
  const res = await axios({
    url: `${environment.baseUrl}/exhibitor/users/activate/${payload.userId}`,
    method: 'POST',
    data: { password: payload.password },
    headers: {
      Authorization: `Bearer ${payload.accessToken}`
    }
  });
  return res.data;
};

export const useActivateExhibitor = ({
  onSuccess,
  onError
}: ApiCallbacks<ActivateExhibitorResponse>) => {
  const mutation = useMutation<
    ActivateExhibitorResponse,
    Error,
    ActivateExhibitorPayload
  >({
    mutationFn: (payload: ActivateExhibitorPayload) => {
      return activateExhibitor(payload);
    }
  });

  return {
    activateExhibitor: (payload: ActivateExhibitorPayload) =>
      mutation.mutate(payload, {
        onSuccess: (data) => {
          onSuccess(data);
        },
        onError: (error) => {
          onError(error);
        }
      }),
    isPending: mutation.isPending
  };
};
