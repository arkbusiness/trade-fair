import {
  IAttendeeAuthUser,
  useAttendeeAuthStore
} from '@/app/module/auth/store';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DEFAULT_CURRENCY } from '../../constants';
import { clientAxios } from '../../lib';
import { attendeeUserService } from '../../services';

export const useAttendeeUser = () => {
  const { accessToken, handleLogOut } = useAttendeeAuthStore();

  const fetchUser = async (
    errorCallback?: () => void
  ): Promise<IAttendeeAuthUser | null> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: attendeeUserService.getUser().url
      });
      const responseData = response.data as IAttendeeAuthUser;

      return responseData;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error?.response?.status;

        if (status === 401 || status === 500) {
          errorCallback?.();
        }
      }
      throw error;
    }
  };

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
    ...queryMeta
  } = useQuery<IAttendeeAuthUser | null>({
    queryKey: attendeeUserService.getUser().queryKey,
    queryFn: () =>
      fetchUser(() => {
        handleLogOut();
      }),
    staleTime: Infinity,
    retry: 2,
    enabled: !!accessToken
  });

  const currency = user?.currency || DEFAULT_CURRENCY;
  return {
    user,
    currency,
    isLoadingUser,
    refetchUser,
    ...queryMeta
  };
};
