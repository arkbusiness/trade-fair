import { useCustomQuery } from '@/app/core/shared/hooks';
import { getBoothByIdQueryOptions } from './booths-query-options';
import type { IBooth } from './types';

export const useBoothById = (id: string) => {
  const {
    data: booth,
    isLoading: isLoadingBooth,
    isRefetching: isRefetchingBooth,
    refetch
  } = useCustomQuery<IBooth>({
    ...getBoothByIdQueryOptions(id),
    options: {
      enabled: !!id
    }
  });

  return {
    booth,
    isLoadingBooth,
    isRefetchingBooth,
    refetchBooth: refetch
  };
};
