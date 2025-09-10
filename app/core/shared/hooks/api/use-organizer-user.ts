import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { clientAxios } from '../../lib';
import { organizerUserService } from '../../services';
import {
  IOrganizerAuthUser,
  useOrganizerAuthStore
} from '@/app/module/auth/store';
import { COUNTRY_DETAILS, DEFAULT_CURRENCY } from '../../constants';

export const useOrganizerUser = () => {
  const { accessToken, handleLogOut } = useOrganizerAuthStore();

  const fetchUser = async (
    errorCallback?: () => void
  ): Promise<IOrganizerAuthUser | null> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: organizerUserService.getUser().url
      });
      const responseData = response.data as IOrganizerAuthUser;

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
  } = useQuery<IOrganizerAuthUser | null>({
    queryKey: organizerUserService.getUser().queryKey,
    queryFn: () =>
      fetchUser(() => {
        handleLogOut();
      }),
    staleTime: Infinity,
    retry: 2,
    enabled: !!accessToken
  });

  const getCurrency = (country: string) => {
    const toLowerCaseCountry = country.toLowerCase();
    const countryDetails =
      COUNTRY_DETAILS[toLowerCaseCountry as keyof typeof COUNTRY_DETAILS];
    return countryDetails?.currency || DEFAULT_CURRENCY;
  };

  return {
    user,
    isLoadingUser,
    currency: getCurrency(user?.country || ''),
    refetchUser,
    ...queryMeta
  };
};
