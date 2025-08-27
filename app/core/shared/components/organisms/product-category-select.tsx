'use client';

import { IProductCategory } from '@/app/module/exhibitor/categories/hooks';
import { productCategoriesService } from '@/app/module/exhibitor/categories/services';
import { useQueryClient } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { GroupBase, Props as SelectProps } from 'react-select';
import { clientFetcher } from '../../lib';
import { IPaginatedResponse } from '../../types';
import { HelperText } from '../atoms';
import { AsyncMultiSelect } from '../molecules';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ProductCategorySelectProps {
  categoryError?: string;
  placeholder?: string;
  onSelectChange: (value: any) => void;
  classNames?: SelectProps<any, true, GroupBase<any>>['classNames'];
  showHelperText?: boolean;
  form: UseFormReturn<any>;
  label?: string;
  name: string;
}

type OptionType = {
  id: string;
  name: string;
};

export const ProductCategorySelect = ({
  form,
  name,
  categoryError = '',
  label = 'Category',
  placeholder = 'Select category',
  onSelectChange,
  classNames,
  showHelperText = true
}: ProductCategorySelectProps) => {
  const queryClient = useQueryClient();
  const { watch } = form;
  const watchedValue = watch(name);

  const loadOptions = async (
    search: string,
    loadedOptions: OptionType[],
    { page }: { page: number }
  ) => {
    const queryKey = ['product-categories-paginated', search, page];

    const result = await queryClient.fetchQuery<
      IPaginatedResponse<IProductCategory>
    >({
      queryKey,
      queryFn: async () =>
        clientFetcher({
          url: productCategoriesService.getCategories({ search, limit: '50' })
            .url,
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
        label={label}
        placeholder={placeholder}
        value={watchedValue}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => option?.id?.toString()}
        hasError={!!categoryError?.length}
        loadOptions={loadOptions as never}
        onSelectChange={(value) => {
          onSelectChange(value);
        }}
        classNames={classNames}
      />
      {showHelperText && <HelperText text="Scroll to load more options" />}
    </div>
  );
};
