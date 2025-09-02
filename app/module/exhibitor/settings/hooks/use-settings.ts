import { EMPTY_ARRAY } from '@/app/core/shared/constants';
import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { extractPaginationMeta } from '@/app/core/shared/utils';
import { exhibitorSettingsService } from '../services';

export interface IExhibitorBoothMembers {
  id: string;
  username?: string;
  email: string;
  isPrimary: boolean;
  status: string;
  lastLogin: string;
  createdAt: string;
}

export const useExhibitorBoothMembers = (
  filter: Record<string, string> = {}
) => {
  const {
    data: boothMembers,
    isLoading: isLoadingBoothMembers,
    isRefetching: isRefetchingBoothMembers,
    refetch
  } = useCustomQuery<IPaginatedResponse<IExhibitorBoothMembers>>({
    ...exhibitorSettingsService.getBoothMembers(filter)
  });

  return {
    boothMembers: boothMembers?.data ?? EMPTY_ARRAY,
    isLoadingBoothMembers,
    isRefetchingBoothMembers,
    paginationMeta: extractPaginationMeta(boothMembers),
    refetchBoothMembers: refetch
  };
};

export const useInvoiceTemplateById = (id: string) => {
  const {
    data: invoiceTemplate,
    isLoading: isLoadingInvoiceTemplate,
    isRefetching: isRefetchingInvoiceTemplate,
    refetch
  } = useCustomQuery<IPaginatedResponse<IExhibitorBoothMembers>>({
    ...exhibitorSettingsService.getInvoiceTemplateById(id)
  });

  return {
    invoiceTemplate: invoiceTemplate?.data ?? EMPTY_ARRAY,
    isLoadingInvoiceTemplate,
    isRefetchingInvoiceTemplate,
    paginationMeta: extractPaginationMeta(invoiceTemplate),
    refetchInvoiceTemplate: refetch
  };
};
