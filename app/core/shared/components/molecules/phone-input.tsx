'use client';

import PhoneInput, { type Value } from 'react-phone-number-input';
import { ErrorText } from '../atoms';
import { cn } from '../../utils';

import 'react-phone-number-input/style.css';

interface PhoneNumberInputProp {
  name: string;
  value?: string;
  label?: string;
  error?: string;
  isDisabled?: boolean;
  onChange: (value: Value | undefined) => void;
}
export const PhoneNumberInput = ({
  value,
  error,
  name,
  label = 'Phone Number',
  isDisabled = false,
  onChange
}: PhoneNumberInputProp) => {
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      <label htmlFor={name} className="text-[0.75rem] font-medium">
        {label}
      </label>

      <div className="w-full">
        <PhoneInput
          placeholder="Eg. +2348012345678"
          id={name}
          value={value}
          defaultCountry="NG"
          className={cn({
            'bg-tertiary/20 border-tertiary/20': !!error?.length
          })}
          disabled={isDisabled}
          onChange={(value) => {
            onChange(value);
          }}
        />
        <ErrorText message={error} />
      </div>
    </div>
  );
};
