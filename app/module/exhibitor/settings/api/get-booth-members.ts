import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { getBoothMembersQueryOptions } from './settings-query-options';
import type { IExhibitorBoothMembers } from './types';

export const useExhibitorBoothMembers = (
  filter: Record<string, string> = {}
) => {
  const {
    data: boothMembers,
    isLoading: isLoadingBoothMembers,
    isRefetching: isRefetchingBoothMembers,
    refetch
  } = useCustomQuery<IPaginatedResponse<IExhibitorBoothMembers>>({
    ...getBoothMembersQueryOptions(filter)
  });

  return {
    boothMembers: boothMembers?.data ?? EMPTY_ARRAY,
    isLoadingBoothMembers,
    isRefetchingBoothMembers,
    paginationMeta: extractPaginationMeta(boothMembers),
    refetchBoothMembers: refetch
  };
};
