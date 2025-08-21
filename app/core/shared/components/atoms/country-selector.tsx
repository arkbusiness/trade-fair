'use client';
import { COUNTRIES_DATA } from '../../constants';
import { cn } from '../../utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select';

interface CountrySelectorProps {
  label?: string;
  name?: string;
  country?: string;
  value: string;
  hasError?: boolean;
  onChange: (value: string) => void;
}

export const CountrySelector = ({
  label,
  name,
  value,
  hasError,
  onChange
}: CountrySelectorProps) => {
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      {label && (
        <label htmlFor={name} className="text-[0.75rem] font-medium">
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
            {COUNTRIES_DATA.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
