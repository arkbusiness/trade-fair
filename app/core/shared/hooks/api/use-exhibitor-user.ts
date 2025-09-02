import {
  IExhibitorAuthUser,
  useExhibitorAuthStore
} from '@/app/module/auth/store';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { clientAxios } from '../../lib';
import { exhibitorUserService } from '../../services';
import { DEFAULT_CURRENCY } from '../../constants';

export const useExhibitorUser = () => {
  const { accessToken, handleLogOut } = useExhibitorAuthStore();

  const fetchUser = async (
    errorCallback?: () => void
  ): Promise<IExhibitorAuthUser | null> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: exhibitorUserService.getUser().url
      });
      const responseData = response.data as IExhibitorAuthUser;

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
  } = useQuery<IExhibitorAuthUser | null>({
    queryKey: exhibitorUserService.getUser().queryKey,
    queryFn: () =>
      fetchUser(() => {
        handleLogOut();
      }),
    staleTime: Infinity,
    retry: 2,
    enabled: !!accessToken
  });

  return {
    user,
    currency: user?.currency || DEFAULT_CURRENCY,
    isLoadingUser,
    refetchUser,
    ...queryMeta
  };
};
