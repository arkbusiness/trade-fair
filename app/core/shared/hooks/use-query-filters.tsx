'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSetParams } from '@/app/core/shared/hooks';
import { filterByAllowedKeys } from '@/app/core/shared/utils';

export const useQueryFilters = (allowedFilters: string[]) => {
  const { searchParamsObject, removeMultipleQueryParams } = useSetParams();
  const [filter, setFilter] = useState<Record<string, string>>({});

  const hasFilter = useMemo(() => {
    return allowedFilters.some((key) => !!filter[key]);
  }, [filter, allowedFilters]);

  useEffect(() => {
    const filteredParams = filterByAllowedKeys(
      searchParamsObject,
      allowedFilters
    ) as Record<string, string>;
    setFilter((prev) => ({
      ...prev,
      ...filteredParams
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsObject]);

  const setFilterParams = (filter: Record<string, string>) => {
    setFilter((prev) => ({
      ...prev,
      ...filter
    }));
  };

  const handleClearFilter = () => {
    removeMultipleQueryParams(allowedFilters);
    setFilter({});
  };

  return {
    filter,
    hasFilter,
    setFilterParams,
    handleClearFilter
  };
};
