'use client';

import { useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { clientFetcher } from '../../lib';
import { IPaginatedResponse } from '../../types';
import { buildQueryParams } from '../../utils';
import { HelperText } from '../atoms';
import { AsyncMultiSelect } from '../molecules';
import { ICategory } from '../../hooks/api';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface BoothCategorySelectProps {
  categoryError?: string;
  onSelectChange: (value: any) => void;
  form: UseFormReturn<any>;
  name: string;
}

type OptionType = {
  id: string;
  name: string;
};

export const BoothCategorySelect = ({
  form,
  name,
  categoryError = '',
  onSelectChange
}: BoothCategorySelectProps) => {
  const queryClient = useQueryClient();
  const { watch } = form;
  const watchedValue = watch(name);

  const loadOptions = async (
    search: string,
    loadedOptions: OptionType[],
    { page }: { page: number }
  ) => {
    const queryKey = ['categories-paginated', search, page];
    const queryParams = buildQueryParams({
      params: {
        search,
        limit: 50
      },
      appendDefaultLimit: false
    });

    const result = await queryClient.fetchQuery<IPaginatedResponse<ICategory>>({
      queryKey,
      queryFn: async () =>
        clientFetcher({
          url: `/organizer/category${queryParams ? `?${queryParams}` : ''}`,
          method: 'GET'
        })
    });

    const { data, pages } = result ?? {};
    const hasMore = page < pages;

    return {
      options: data ?? [],
      hasMore,
      additional: {
        page: page + 1
      }
    };
  };

  return (
    <div className="w-full">
      <AsyncMultiSelect
        name={name}
        label="Category"
        placeholder="Select category"
        value={watchedValue}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => option?.id?.toString()}
        hasError={!!categoryError?.length}
        loadOptions={loadOptions as never}
        onSelectChange={(value) => {
          onSelectChange(value);
        }}
      />
      <HelperText text="Scroll to load more options" />
    </div>
  );
};
