'use client';

import { Search } from 'lucide-react';
import { Input, InputProps } from '../atoms';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@/app/core/shared/hooks';
import { cn } from '../../utils';

interface TableSearchInputProps extends InputProps {
  handleSearch(value: string): void;
  inputClassName?: string;
}

export const TableSearchInput = ({
  placeholder = 'Search...',
  handleSearch,
  inputClassName,
  ...props
}: TableSearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative w-full xs:min-w-[270px] flex items-center h-[2.19rem]">
      <Search
        size={14}
        className="absolute left-[0.5rem] text-muted-foreground/70"
      />
      <Input
        type="search"
        placeholder={placeholder}
        inputClassName={cn(
          'h-[2.5rem] pl-7 placeholder:text-[.75rem] placeholder:text-black w-full',
          inputClassName
        )}
        {...props}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;
          setSearchTerm(value);
        }}
      />
    </div>
  );
};
