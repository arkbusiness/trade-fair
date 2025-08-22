import {
  IExhibitorAuthUser,
  useExhibitorAuthStore
} from '@/app/module/auth/store';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { clientAxios } from '../../lib';
import { exhibitorUserService } from '../../services';

export const useExhibitorUser = (token: string) => {
  const { accessToken, handleLogOut } = useExhibitorAuthStore();

  const fetchUser = async (
    errorCallback?: () => void
  ): Promise<IExhibitorAuthUser | null> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: exhibitorUserService.getUser(token).url
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
    queryKey: exhibitorUserService.getUser(token).queryKey,
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
