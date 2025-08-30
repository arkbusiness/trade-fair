'use client';

import { HelperText } from '@/app/core/shared/components/atoms';
import { AsyncMultiSelect } from '@/app/core/shared/components/molecules';
import { clientFetcher } from '@/app/core/shared/lib';
import { IPaginatedResponse } from '@/app/core/shared/types';
import { buildQueryParams } from '@/app/core/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { IExhibitor } from '../../hooks';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ExhibitorsSelectProps {
  exhibitorsError?: string;
  onSelectChange: (value: any) => void;
  form: UseFormReturn<any>;
  name: string;
}

type OptionType = {
  id: string;
  number: string;
};

export const ExhibitorsSelect = ({
  form,
  name,
  exhibitorsError = '',
  onSelectChange
}: ExhibitorsSelectProps) => {
  const queryClient = useQueryClient();
  const { watch } = form;
  const watchedValue = watch(name);

  const loadOptions = async (
    search: string,
    loadedOptions: OptionType[],
    { page }: { page: number }
  ) => {
    const queryKey = ['invites-exhibitors-paginated', search, page];
    const queryParams = buildQueryParams({
      params: {
        search,
        limit: 50
      },
      appendDefaultLimit: false
    });

    const result = await queryClient.fetchQuery<IPaginatedResponse<IExhibitor>>(
      {
        queryKey,
        queryFn: async () =>
          clientFetcher({
            url: `/organizer/invites-exhibitors${queryParams ? `?${queryParams}` : ''}`,
            method: 'GET'
          })
      }
    );

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
        label="Exhibitor"
        placeholder="Select exhibitor"
        value={watchedValue}
        getOptionLabel={(option) =>
          `${option?.exhibitorName ?? option.email}(${option?.status})`
        }
        getOptionValue={(option) => option?.id?.toString()}
        hasError={!!exhibitorsError?.length}
        loadOptions={loadOptions as never}
        onSelectChange={(value) => {
          onSelectChange(value);
        }}
      />
      <HelperText text="Scroll to load more options" />
    </div>
  );
};
