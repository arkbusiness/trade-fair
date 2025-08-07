'use client';

import { ArrowDownUp } from 'lucide-react';
import { useId } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '../atoms';

interface SortListProps {
  children: React.ReactNode;
  handleSort: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleReset: () => void;
}

export const SortList = ({
  children,
  handleSort,
  open,
  setOpen,
  handleReset
}: SortListProps) => {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowDownUp />
          Sort & Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        className="flex w-full max-w-[var(--radix-popover-content-available-width)] origin-[var(--radix-popover-content-transform-origin)] flex-col gap-3.5 p-4 sm:min-w-[380px]"
      >
        <div className="flex flex-col gap-1">
          <h4 id={labelId} className="font-medium leading-none">
            Sort & filter
          </h4>
          <div className="mt-4 flex flex-col gap-4 items-center">
            {children}
          </div>
          <div className="flex w-full items-center gap-2 mt-4 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded"
              onClick={handleReset}
            >
              Reset
            </Button>

            <Button
              type="button"
              variant="tertiary"
              size="sm"
              className="rounded min-w-[80px]"
              onClick={handleSort}
            >
              Submit
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
