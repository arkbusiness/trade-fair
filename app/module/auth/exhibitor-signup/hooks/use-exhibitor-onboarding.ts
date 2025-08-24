import { useCustomQuery } from '@/app/core/shared/hooks';
import { exhibitorAuthService } from '../../services';

export interface IExhibitorOnboarding {
  id: string;
  email: string;
  boothNumber: string;
  token: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
  updatedAt: string;
  organizerId: string;
  exhibitorId: string | null;
}

export const useExhibitorOnboarding = (token: string) => {
  const {
    data: exhibitorOnboarding,
    isLoading: isLoadingExhibitorOnboarding,
    isRefetching: isRefetchingExhibitorOnboarding,
    refetch
  } = useCustomQuery<IExhibitorOnboarding>({
    ...exhibitorAuthService.getOnboarding(token),
    options: {
      enabled: !!token
    }
  });
  return {
    exhibitorOnboarding,
    isLoadingExhibitorOnboarding,
    isRefetchingExhibitorOnboarding,
    refetchExhibitorOnboarding: refetch
  };
};
