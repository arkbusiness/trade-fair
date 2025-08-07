'use client';
import { RegionDropdown } from 'react-country-region-selector';
import { cn } from '../../utils';

interface RegionSelectorProps {
  label?: string;
  name?: string;
  country?: string;
  value: string;
  hasError?: boolean;
  onChange: (value: string) => void;
}

export const RegionSelector = ({
  label,
  name,
  country = 'Nigeria',
  value,
  hasError,
  onChange
}: RegionSelectorProps) => {
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      {label && (
        <label htmlFor={name} className="text-[0.75rem] font-medium">
          {label}
        </label>
      )}
      <RegionDropdown
        className={cn(
          'region__selector',
          'selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-[2.5rem] rounded-[4px] w min-w-0 border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-[2.5rem]  file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-muted-foreground/70 w-full',
          {
            'bg-tertiary/20 border-tertiary/20': hasError
          }
        )}
        country={country}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
