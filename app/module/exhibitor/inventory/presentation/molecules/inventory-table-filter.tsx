'use client';

import {
  ErrorText,
  Input,
  SelectItem,
  Separator
} from '@/app/core/shared/components/atoms';
import { CustomSelect, SortList } from '@/app/core/shared/components/molecules';
import { SORTING_OPTIONS } from '@/app/core/shared/constants';
import { useSetParams } from '@/app/core/shared/hooks';
import { SortOrderEnum } from '@/app/core/shared/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface InventoryTableFiltersProps {
  handleReset: () => void;
}

const SORT_OPTIONS = [
  {
    label: 'Created at',
    value: 'createdAt'
  },
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Price',
    value: 'price'
  },
  {
    label: 'SKU',
    value: 'sku'
  }
];

const validationSchema = yup.object({
  sortBy: yup.string(),
  order: yup.string(),
  minPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .min(1, 'Min price must be at least 1')
    .typeError('Invalid min price')
    .test(
      'no-leading-total-zero',
      'Leading zero is not allowed',
      (_value, context) => {
        const value = context.originalValue?.toString() ?? '';
        if (value === '') return true; // Skip validation for empty values
        const hasInvalidLeadingZero = value !== '0' && value.startsWith('0');
        return !hasInvalidLeadingZero;
      }
    ),
  maxPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value;
    })
    .typeError('Invalid max price')
    .test(
      'no-leading-total-zero',
      'Leading zero is not allowed',
      (_value, context) => {
        const value = context.originalValue?.toString() ?? '';
        if (value === '') return true; // Skip validation for empty values
        const hasInvalidLeadingZero = value !== '0' && value.startsWith('0');
        return !hasInvalidLeadingZero;
      }
    )
    .test(
      'greater-than-min',
      'Max price must be greater than min price',
      function (value) {
        const minPrice = this.parent.minPrice;
        if (!minPrice || !value) return true; // Skip validation if either is empty
        return value > minPrice;
      }
    )
});

type InventoryTableFiltersValues = yup.InferType<typeof validationSchema>;

export const InventoryTableFilter = ({
  handleReset
}: InventoryTableFiltersProps) => {
  const [open, setOpen] = useState(false);
  const { setMultipleParam, searchParamsObject, hasSearchParams } =
    useSetParams();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<InventoryTableFiltersValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sortBy: searchParamsObject?.sortBy || '',
      order: searchParamsObject?.orderBy || SortOrderEnum.DESC,
      minPrice: searchParamsObject?.minPrice
        ? Number(searchParamsObject.minPrice)
        : undefined,
      maxPrice: searchParamsObject?.maxPrice
        ? Number(searchParamsObject.maxPrice)
        : undefined
    }
  });

  const onSubmit = handleSubmit((values) => {
    const hasSortByAndSortOrder = values.sortBy && values.order;
    const hasMinPriceAndMaxPrice = values.minPrice && values.maxPrice;

    const updatedValues = {
      page: '1',
      sortBy: hasSortByAndSortOrder ? values.sortBy || '' : '',
      order: hasSortByAndSortOrder ? values.order || '' : '',
      minPrice: hasMinPriceAndMaxPrice ? values.minPrice?.toString() || '' : '',
      maxPrice: hasMinPriceAndMaxPrice ? values.maxPrice?.toString() || '' : ''
    };
    setMultipleParam(updatedValues);
    setOpen(false);
  });

  const onReset = () => {
    reset({
      sortBy: '',
      order: '',
      minPrice: undefined,
      maxPrice: undefined
    });
    handleReset();
  };

  const handleOpenSort = (value: boolean) => {
    if (!hasSearchParams()) {
      reset({
        sortBy: '',
        order: '',
        minPrice: undefined,
        maxPrice: undefined
      });
    }

    setOpen(value);
  };

  const { minPrice: minPriceError, maxPrice: maxPriceError } = errors;

  const watchedSortBy = watch('sortBy');
  const watchedOrderBy = watch('order');

  return (
    <SortList
      handleSort={onSubmit}
      handleReset={onReset}
      open={open}
      setOpen={handleOpenSort}
    >
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-4 items-center"
      >
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Sort by */}
          <CustomSelect
            label="Sort by"
            placeholder="Select..."
            value={watchedSortBy}
            onChange={(value) => {
              setValue(`sortBy`, value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
              });
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <SelectItem
                key={option.label}
                value={option.value}
                className="capitalize"
              >
                {option.label}
              </SelectItem>
            ))}
          </CustomSelect>

          {/* Sort order */}
          <CustomSelect
            label="Sort order"
            placeholder="Select..."
            value={watchedOrderBy}
            onChange={(value) => {
              setValue(`order`, value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
              });
            }}
          >
            {SORTING_OPTIONS.map((option) => (
              <SelectItem
                key={option.label}
                value={option.value}
                className="capitalize"
              >
                {option.label}
              </SelectItem>
            ))}
          </CustomSelect>
        </div>
        {/* Separator */}
        <Separator />
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="w-full">
              <Input
                type="number"
                label="Min price"
                step="0.01"
                placeholder="Enter min price"
                hasError={!!minPriceError?.message?.length}
                {...register(`minPrice`)}
              />
              <ErrorText message={minPriceError?.message} />
            </div>

            <div className="w-full">
              <Input
                type="number"
                label="Max price"
                step="0.01"
                placeholder="Enter max price"
                hasError={!!maxPriceError?.message?.length}
                {...register(`maxPrice`)}
              />
              <ErrorText message={maxPriceError?.message} />
            </div>
          </div>
        </div>
      </form>
    </SortList>
  );
};
