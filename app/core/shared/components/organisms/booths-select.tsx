'use client';

import { IBooth } from '@/app/module/organizer/booths/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { clientFetcher } from '../../lib';
import { IPaginatedResponse } from '../../types';
import { buildQueryParams } from '../../utils';
import { HelperText } from '../atoms';
import { AsyncMultiSelect } from '../molecules';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface BoothsSelectProps {
  boothsError?: string;
  onSelectChange: (value: any) => void;
  form: UseFormReturn<any>;
  name: string;
}

type OptionType = {
  id: string;
  number: string;
};

export const BoothsSelect = ({
  form,
  name,
  boothsError = '',
  onSelectChange
}: BoothsSelectProps) => {
  const queryClient = useQueryClient();
  const { watch } = form;
  const watchedValue = watch(name);

  const loadOptions = async (
    search: string,
    loadedOptions: OptionType[],
    { page }: { page: number }
  ) => {
    const queryKey = ['booths-paginated', search, page];
    const queryParams = buildQueryParams({
      params: {
        search,
        limit: 50
      },
      appendDefaultLimit: false
    });

    const result = await queryClient.fetchQuery<IPaginatedResponse<IBooth>>({
      queryKey,
      queryFn: async () =>
        clientFetcher({
          url: `/organizer/booths${queryParams ? `?${queryParams}` : ''}`,
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
        label="Booth"
        placeholder="Select booth"
        value={watchedValue}
        getOptionLabel={(option) =>
          `${option?.number}(${option?.status} - ${option?.categoryName})`
        }
        getOptionValue={(option) => option?.id?.toString()}
        hasError={!!boothsError?.length}
        loadOptions={loadOptions as never}
        onSelectChange={(value) => {
          onSelectChange(value);
        }}
      />
      <HelperText text="Scroll to load more options" />
    </div>
  );
};
