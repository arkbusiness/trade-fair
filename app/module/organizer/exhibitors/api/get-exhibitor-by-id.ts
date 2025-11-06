import { useCustomQuery } from '@/app/core/shared/hooks';
import { getExhibitorByIdQueryOptions } from './exhibitors-query-options';
import type { IExhibitor } from './types';

export const useOrganizerExhibitorById = (id: string) => {
  const {
    data: exhibitor,
    isLoading: isLoadingExhibitor,
    isRefetching: isRefetchingExhibitor,
    refetch
  } = useCustomQuery<IExhibitor>({
    ...getExhibitorByIdQueryOptions(id)
  });

  return {
    exhibitor,
    isLoadingExhibitor,
    isRefetchingExhibitor,
    refetchExhibitor: refetch
  };
};
