'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../atoms';

interface TableSelectFilterProps {
  items: { value: string; label: string; column?: string }[];
  defaultValue: string;
  handleSelectedFilter(value: string): void;
}

export const TableSelectFilter = ({
  items,
  defaultValue,
  handleSelectedFilter
}: TableSelectFilterProps) => {
  return (
    <div className="flex items-center justify-between  min-w-[140px]">
      <label htmlFor="select-selector" className="sr-only">
        Select
      </label>
      <div className="flex w-full">
        <Select
          value={defaultValue}
          onValueChange={(value) => {
            handleSelectedFilter(value);
          }}
        >
          <SelectTrigger className="flex w-full" id="select-selector">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {items.map((rg) => {
              return (
                <SelectItem value={rg.value.toString()} key={rg.value}>
                  {rg.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
