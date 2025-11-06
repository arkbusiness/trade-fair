import { useCustomQuery } from '@/app/core/shared/hooks';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { getInvoiceTemplatesQueryOptions } from './settings-query-options';
import type { InvoiceTemplate } from './types';

export const useInvoiceTemplates = () => {
  const {
    data: invoiceTemplate,
    isLoading: isLoadingInvoiceTemplates,
    isRefetching: isRefetchingInvoiceTemplates,
    refetch
  } = useCustomQuery<IPaginatedResponse<InvoiceTemplate>>({
    ...getInvoiceTemplatesQueryOptions()
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
