import { buildQueryParams } from '@/app/core/shared/utils';

export const settingsQueryKeys = {
  boothMembers: {
    base: 'exhibitor-booth-members',
    lists: (filter: Record<string, string>) => [
      settingsQueryKeys.boothMembers.base,
      { ...filter }
    ]
  },
  invoiceTemplates: {
    base: 'exhibitor-templates',
    all: ['exhibitor-templates']
  }
};

export const getBoothMembersQueryOptions = (
  filter: Record<string, string> = {}
) => {
  const queryParams = buildQueryParams({
    params: filter
  });
  return {
    queryKey: settingsQueryKeys.boothMembers.lists(filter),
    url: `/exhibitor/users${queryParams ? `?${queryParams}` : ''}`
  };
};

export const getInvoiceTemplatesQueryOptions = () => ({
  queryKey: settingsQueryKeys.invoiceTemplates.all,
  url: `/exhibitor/templates`
});
