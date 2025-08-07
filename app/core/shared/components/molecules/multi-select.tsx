'use client';

import dynamic from 'next/dynamic';
import Select, { GroupBase, Props as SelectProps } from 'react-select';

const DynamicSelect = dynamic(() => import('react-select'), {
  ssr: false
}) as unknown as typeof Select;

interface MultiSelectProps<T>
  extends Partial<SelectProps<T, true, GroupBase<T>>> {
  label?: string;
  placeholder?: string;
  name: string;
  options: T[];
  defaultValue?: T[];
  hasError?: boolean;
  controlClassName?: string;
  optionLabelProp?: string;
  optionValueProp?: string;
  isDisabled?: boolean;
  onSelectChange: (value: T[]) => void;
}

export const MultiSelect = <T,>({
  label,
  placeholder,
  options,
  defaultValue,
  hasError,
  name,
  controlClassName,
  optionLabelProp = 'name',
  optionValueProp = 'id',
  isDisabled = false,
  onSelectChange,
  ...restProps
}: MultiSelectProps<T>) => {
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      {label && (
        <label htmlFor={name} className="text-[0.75rem] font-medium">
          {label}
        </label>
      )}
      <DynamicSelect<T, true>
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        options={options}
        className="w-full"
        classNamePrefix="r-select"
        isMulti
        getOptionLabel={(option) => option[optionLabelProp as never]}
        getOptionValue={(option) => option[optionValueProp as never]}
        isDisabled={isDisabled}
        onChange={(value) => {
          onSelectChange(value as T[]);
        }}
        classNames={{
          control: () => {
            return `w-full flex dark:bg-input/30 border-input min-h-[2.5rem] rounded-[4px] border bg-transparent shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-muted-foreground/70 min-h-auto ${controlClassName} ${hasError ? '!bg-tertiary/20 !border-tertiary/20' : ''}`;
          },
          option: () => 'w-full !placeholder:text-muted-foreground/70 !text-sm'
        }}
        {...restProps}
      />
    </div>
  );
};
