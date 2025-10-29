import { useCustomQuery } from '@/app/core/shared/hooks';

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

const getExhibitorOnboardingQueryOptions = (token: string) => ({
  url: `/exhibitor/register/${token}`,
  queryKey: ['exhibitor-onboarding', token]
});

export const useExhibitorOnboarding = (token: string) => {
  const {
    data: exhibitorOnboarding,
    isLoading: isLoadingExhibitorOnboarding,
    isRefetching: isRefetchingExhibitorOnboarding,
    refetch
  } = useCustomQuery<IExhibitorOnboarding>({
    ...getExhibitorOnboardingQueryOptions(token),
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
