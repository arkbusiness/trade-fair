'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger
} from '../atoms';

interface TimeRangeProps {
  range: { value: string; label: string }[];
  defaultValue: string;
  handleSelectedRange(value: string): void;
}

export const TimeRange = ({
  range,
  defaultValue,
  handleSelectedRange
}: TimeRangeProps) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="flex w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between  w-full">
        <label htmlFor="view-selector" className="sr-only">
          View
        </label>
        <div className="flex md:hidden">
          <Select
            defaultValue={defaultValue}
            onValueChange={handleSelectedRange}
          >
            <SelectTrigger
              className="@4xl/main:hidden flex w-fit"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              {range.map((rg) => {
                return (
                  <SelectItem value={rg.value.toString()} key={rg.value}>
                    {rg.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex">
          <TabsList className="flex bg-highlight h-[2.7rem] px-[1rem] rounded-[6px] gap-x-4">
            {range.map((rg) => {
              return (
                <TabsTrigger
                  value={rg.value}
                  key={rg.label}
                  className="px-[10px] cursor-pointer"
                  onClick={() => handleSelectedRange(rg.value)}
                >
                  {rg.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
};
