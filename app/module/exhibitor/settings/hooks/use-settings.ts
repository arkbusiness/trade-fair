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

export interface InvoiceTemplate {
  id: string;
  exhibitorId: string;
  htmlTemplate: string | null;
  createdAt: string;
  additionalInformation: string;
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

export const useInvoiceTemplates = () => {
  const {
    data: invoiceTemplate,
    isLoading: isLoadingInvoiceTemplates,
    isRefetching: isRefetchingInvoiceTemplates,
    refetch
  } = useCustomQuery<IPaginatedResponse<InvoiceTemplate>>({
    ...exhibitorSettingsService.getInvoiceTemplates()
  });

  return {
    invoiceTemplates: invoiceTemplate?.data
      ? invoiceTemplate?.data?.[0]
      : undefined,
    isLoadingInvoiceTemplates,
    isRefetchingInvoiceTemplates,
    refetchInvoiceTemplates: refetch
  };
};
