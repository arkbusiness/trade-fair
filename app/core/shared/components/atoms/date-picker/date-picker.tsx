'use client';

import { enUS } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { FieldValues, Path } from 'react-hook-form';
import { cn } from '../../../utils';
registerLocale('en', enUS);

import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

export interface IDatePicker<T extends FieldValues> {
  name: Path<T> | string;
  label?: string;
  className?: string;
  labelClassName?: string;
  placeholderText?: string;
  showTimeSelect?: boolean;
  isDisabled?: boolean;
  dateFormat?: string;
  value: Date | null;
  handleChange: ({
    name,
    value
  }: {
    name: Path<T> | string;
    value: Date | null;
  }) => void;
  min?: Date | undefined;
  max?: Date | undefined;
}

export const DatePicker = <T extends FieldValues>({
  name,
  label,
  labelClassName,
  placeholderText,
  min = undefined,
  max = undefined,
  value,
  handleChange,
  showTimeSelect = false,
  className = '',
  isDisabled = false
}: IDatePicker<T>) => {
  const format = showTimeSelect ? 'MMMM d, yyyy h:mm aa' : 'MMMM d, yyyy';

  return (
    <div className={cn('flex flex-col gap-[0.5rem]', className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn('text-[0.75rem] font-medium', labelClassName)}
        >
          {label}
        </label>
      )}
      <div className="flex items-center h-10 w-full rounded-md border  bg-background  text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
        <div className="flex-1 h-full text-left">
          <ReactDatePicker
            name={name}
            onChange={(date) => handleChange({ name, value: date })}
            selected={value}
            placeholderText={placeholderText}
            minDate={min}
            maxDate={max}
            className="h-full"
            disabled={isDisabled}
            locale="en"
            dateFormat={format}
            showTimeSelect={showTimeSelect}
            timeIntervals={10}
          />
        </div>
        <div className="w-10 flex h-full  justify-center items-center border-l border-border">
          <CalendarIcon size={16} />
        </div>
      </div>
    </div>
  );
};
