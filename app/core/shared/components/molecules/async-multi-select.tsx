'use client';

import dynamic from 'next/dynamic';
import Select, { GroupBase, Props as SelectProps } from 'react-select';
import { LoadOptions, withAsyncPaginate } from 'react-select-async-paginate';

const DynamicSelect = dynamic(() => import('react-select'), {
  ssr: false
}) as unknown as typeof Select;

// Wrap react-select with async pagination support
const AsyncPaginateSelect = withAsyncPaginate(DynamicSelect);

interface MultiSelectProps<T>
  extends Partial<SelectProps<T, true, GroupBase<T>>> {
  label?: string;
  placeholder?: string;
  name: string;
  loadOptions: LoadOptions<T, GroupBase<T>, { page: number }>;
  defaultValue?: T[];
  hasError?: boolean;
  controlClassName?: string;
  classNames?: SelectProps<T, true, GroupBase<T>>['classNames'];
  isDisabled?: boolean;
  onSelectChange: (value: T[]) => void;
}

export const AsyncMultiSelect = <T,>({
  label,
  placeholder,
  defaultValue,
  hasError,
  name,
  controlClassName,
  isDisabled = false,
  onSelectChange,
  loadOptions,
  classNames,
  ...restProps
}: MultiSelectProps<T>) => {
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      {label && (
        <label htmlFor={name} className="text-[0.75rem] font-medium">
          {label}
        </label>
      )}
      <AsyncPaginateSelect
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        loadOptions={loadOptions}
        className="w-full"
        classNamePrefix="async-select"
        isDisabled={isDisabled}
        onChange={(value) => {
          onSelectChange(value as T[]);
        }}
        additional={{ page: 1 }}
        debounceTimeout={300}
        classNames={{
          control: () =>
            `w-full flex dark:bg-input/30 border-input! min-h-[2.5rem] rounded-[4px] border bg-light-gray-2 shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-muted-foreground/70 min-h-auto  ${controlClassName} ${
              hasError ? '!bg-tertiary/20 !border-tertiary/20' : ''
            }`,
          option: () => 'w-full !placeholder:text-muted-foreground/70 !text-sm',
          ...classNames
        }}
        {...restProps}
      />
    </div>
  );
};
