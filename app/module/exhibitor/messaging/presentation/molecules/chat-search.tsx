'use client';

import { Input } from '@/app/core/shared/components/atoms';
import { Search } from 'lucide-react';

interface ChatSearchProps {
  handleSearch(value: string): void;
}

export const ChatSearch = ({ handleSearch }: ChatSearchProps) => {
  return (
    <div className="my-6 px-4 flex items-center h-10 relative">
      <Search
        size={14}
        className="absolute left-[1.5rem] text-muted-foreground/90"
      />
      <Input
        placeholder="Search Messages..."
        inputClassName="pl-7 w-full"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
