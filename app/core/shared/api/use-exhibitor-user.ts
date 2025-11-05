import {
  IExhibitorAuthUser,
  useExhibitorAuthStore
} from '@/app/module/auth/store';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { clientAxios } from '../lib';
import { COUNTRY_DETAILS, DEFAULT_CURRENCY } from '../constants';

export const exhibitorUserQueryKeys = {
  profile: ['exhibitor-profile'] as const
};

export const useExhibitorUser = () => {
  const { accessToken, handleLogOut } = useExhibitorAuthStore();

  const fetchUser = async (): Promise<IExhibitorAuthUser | null> => {
    try {
      const response = await clientAxios({
        method: 'get',
        url: `/exhibitor`
      });
      const responseData = response.data as IExhibitorAuthUser;

      return responseData;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error?.response?.status;

        if (status === 401 || status === 500) {
          handleLogOut();
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
    queryKey: exhibitorUserQueryKeys.profile,
    queryFn: () => fetchUser(),
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
    currency: getCurrency(user?.country || ''),
    isLoadingUser,
    refetchUser,
    ...queryMeta
  };
};
