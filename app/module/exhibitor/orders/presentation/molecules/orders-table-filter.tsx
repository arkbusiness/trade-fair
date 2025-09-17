'use client';

import { DatePicker, Separator } from '@/app/core/shared/components/atoms';
import {
  CurrencySelector,
  SortList
} from '@/app/core/shared/components/molecules';
import { useSetParams } from '@/app/core/shared/hooks';
import { formatDate } from '@/app/core/shared/lib';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface OrdersTableFiltersProps {
  handleReset: () => void;
}

const validationSchema = yup.object({
  currency: yup.string(),
  from: yup.date().typeError('Must be a valid date'),
  to: yup.date().typeError('Must be a valid date')
});

type OrdersTableFiltersValues = yup.InferType<typeof validationSchema>;

export const OrdersTableFilter = ({ handleReset }: OrdersTableFiltersProps) => {
  const [open, setOpen] = useState(false);
  const { setMultipleParam, searchParamsObject, hasSearchParams } =
    useSetParams();

  const { handleSubmit, watch, reset, setValue } =
    useForm<OrdersTableFiltersValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        currency: searchParamsObject?.currency || '',
        from: searchParamsObject?.from
          ? new Date(searchParamsObject.from)
          : undefined,
        to: searchParamsObject?.to ? new Date(searchParamsObject.to) : undefined
      }
    });

  const onSubmit = handleSubmit((values) => {
    const hasFromAndTo = values.from && values.to;

    const updatedValues = {
      page: '1',
      currency: values.currency || '',
      from: hasFromAndTo ? formatDate(values.from as never) : '',
      to: hasFromAndTo ? formatDate(values.to as never) : ''
    };
    setMultipleParam(updatedValues);
    setOpen(false);
  });

  const onReset = () => {
    reset({
      currency: '',
      from: undefined,
      to: undefined
    });
    handleReset();
  };

  const handleOpenSort = (value: boolean) => {
    if (!hasSearchParams()) {
      reset({
        currency: '',
        from: undefined,
        to: undefined
      });
    }

    setOpen(value);
  };

  const watchedCurrency = watch('currency') ?? '';
  const watchedFrom = watch('from') ?? null;
  const watchedTo = watch('to') ?? null;

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
        {/* Currency */}
        <CurrencySelector
          label="Currency"
          name="currency"
          value={watchedCurrency}
          onChange={(value) => {
            setValue(`currency`, value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true
            });
          }}
        />

        {/* Separator */}
        <Separator />
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="w-full">
              <DatePicker
                value={watchedFrom}
                name="from"
                label="From"
                placeholderText="mm/dd/yyyy"
                handleChange={({ value }) => {
                  setValue('from', value as Date, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
              />
            </div>

            <div className="w-full">
              <DatePicker
                value={watchedTo}
                name="to"
                label="To"
                placeholderText="mm/dd/yyyy"
                handleChange={({ value }) => {
                  setValue('to', value as Date, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </SortList>
  );
};
