import { IAuthUser, useAuthStore } from '@/module/auth/store';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { clientAxios } from '../../lib';
import { organizerUserService } from '../../services';

export const useOrganizerUser = () => {
  const { accessToken, handleLogOut } = useAuthStore();

  const fetchUser = async (
    errorCallback?: () => void
  ): Promise<IAuthUser | null> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: organizerUserService.getUser().url
      });
      const responseData = response.data as IAuthUser;

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
  } = useQuery<IAuthUser | null>({
    queryKey: organizerUserService.getUser().queryKey,
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
    isLoadingUser,
    refetchUser,
    ...queryMeta
  };
};
