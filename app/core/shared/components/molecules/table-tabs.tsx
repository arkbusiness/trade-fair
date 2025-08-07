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

interface TableTabsProps {
  tabs: ITableTabItem[];
  defaultValue: string;
  handleSelectedTab(value: ITableTabItem): void;
}

export interface ITableTabItem {
  value: string;
  label: string;
}

export const TableTabs = ({
  tabs,
  defaultValue,
  handleSelectedTab
}: TableTabsProps) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="flex w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between  w-full">
        <label htmlFor="view-selector" className="sr-only">
          Select
        </label>
        <div className="flex md:hidden">
          <Select
            defaultValue={defaultValue}
            onValueChange={(value) => {
              const findItem = tabs.find((item) => item.value === value);
              if (findItem) {
                handleSelectedTab(findItem);
              }
            }}
          >
            <SelectTrigger
              className="@4xl/main:hidden flex w-fit"
              id="view-selector"
            >
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((rg) => {
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
            {tabs.map((tab) => {
              return (
                <TabsTrigger
                  value={tab.value}
                  key={tab.label}
                  className="px-[10px] cursor-pointer"
                  onClick={() => handleSelectedTab(tab)}
                >
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
};
