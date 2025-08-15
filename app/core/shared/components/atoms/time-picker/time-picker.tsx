'use client';

import { Clock } from 'lucide-react';
import ReactDatePicker from 'react-datepicker';
import { FieldValues, Path } from 'react-hook-form';
import { cn } from '../../../utils';

import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

export interface ITimePicker<T extends FieldValues> {
  name: Path<T> | string;
  label?: string;
  className?: string;
  placeholderText?: string;
  value: Date | null;
  handleChange: ({
    name,
    value
  }: {
    name: Path<T> | string;
    value: Date | null;
  }) => void;
}

export const TimePicker = <T extends FieldValues>({
  name,
  label,
  placeholderText,
  value,
  handleChange,
  className = ''
}: ITimePicker<T>) => {
  return (
    <div className={cn('flex flex-col gap-[0.5rem]', className)}>
      {label && (
        <label htmlFor={name} className="text-[0.75rem] font-medium">
          {label}
        </label>
      )}
      <div className="flex items-center h-10 w-full rounded-md border  bg-background  text-sm ring-offset-background  file:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 relative">
        <div className="flex-1 h-full text-left">
          <ReactDatePicker
            name={name}
            onChange={(date) => handleChange({ name, value: date })}
            selected={value}
            placeholderText={placeholderText}
            showTimeSelect
            showTimeSelectOnly
            timeCaption="Time:"
            autoComplete="off"
            dateFormat="h:mm aa"
            className="h-full"
          />
        </div>
        <div className="w-10 flex h-full  justify-center items-center border-l border-border">
          <Clock size={16} />
        </div>
      </div>
    </div>
  );
};
