import { Search } from 'lucide-react';
import { Input, InputProps } from '../atoms';

export const SearchInput = ({
  placeholder = 'Search...',
  ...props
}: InputProps) => {
  return (
    <div className="relative w-full flex items-center h-[2.19rem]">
      <Search
        size={14}
        className="absolute left-[0.5rem] text-muted-foreground/70"
      />
      <Input
        placeholder={placeholder}
        inputClassName="h-[2.19rem] pl-6 placeholder:text-[.75rem]"
        {...props}
      />
    </div>
  );
};
