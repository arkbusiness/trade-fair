'use client';
import { COUNTRY_CURRENCY_LIST } from '../../constants';
import { cn } from '../../utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../atoms';

interface CurrencySelectorProps {
  label?: string;
  name?: string;
  value: string;
  labelClassName?: string;
  hasError?: boolean;
  onChange: (value: string) => void;
}

export const CurrencySelector = ({
  label,
  name,
  value,
  labelClassName,
  hasError,
  onChange
}: CurrencySelectorProps) => {
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      {label && (
        <label
          htmlFor={name}
          className={cn('text-[0.75rem] font-medium', labelClassName)}
        >
          {label}
        </label>
      )}

      <div className="h-[2.5rem] w-full">
        <Select value={value} name={name} onValueChange={onChange}>
          <SelectTrigger
            className={cn(
              'cursor-pointer  border-[1px] border-input h-full! min-h-full! w-full',
              {
                'bg-tertiary/20 border-tertiary/20': hasError
              }
            )}
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {COUNTRY_CURRENCY_LIST.map((currency, index) => {
              const key = currency.toLowerCase() + index;
              return (
                <SelectItem key={key} value={currency}>
                  {currency}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
