'use client';

import { cn } from '../../utils';
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
  tabs: IBorderTabItem[];
  defaultValue: string;
  showCount?: boolean;
  rightContent?: React.ReactNode;
  rightContentClassName?: string;
  tabTriggerClassName?: string;
  tabListClassName?: string;
  tabListContainerClassName?: string;
  selectContainerClassName?: string;
  selectedValue?: string;
  variant?: 'default' | 'chat';
  handleSelectedTab(value: IBorderTabItem): void;
}

export interface IBorderTabItem {
  value: string;
  label: string;
  count?: number;
}

export const BorderTab = ({
  tabs,
  defaultValue,
  selectedValue,
  showCount = false,
  rightContent,
  rightContentClassName,
  tabTriggerClassName,
  tabListClassName,
  tabListContainerClassName,
  selectContainerClassName,
  variant = 'default',
  handleSelectedTab
}: TableTabsProps) => {
  const isDefaultVariant = variant === 'default';

  const renderCountLabel = (count: number) => {
    if (variant === 'chat') {
      return `(${count || 0})`;
    }
    return count || 0;
  };

  return (
    <Tabs
      defaultValue={defaultValue}
      className="flex w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between  w-full">
        <label htmlFor="view-selector" className="sr-only">
          Select
        </label>
        <div className={cn('flex lg:hidden', selectContainerClassName)}>
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
        <div className={cn('hidden lg:flex w-full', tabListContainerClassName)}>
          <TabsList
            className={cn(
              'flex bg-transparent h-[2.7rem] px-[1rem] py-0  gap-x-4 border-b-1 border-b-input rounded-none w-full justify-start',
              tabListClassName
            )}
          >
            {tabs.map((tab) => {
              return (
                <TabsTrigger
                  value={tab.value}
                  key={tab.label}
                  className={cn(
                    'px-[10px] cursor-pointer border-b rounded-none bg-transparent data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-tertiary data-[state=active]:border-3 data-[state=active]:text-tertiary  data-[state=active]:shadow-none self-start max-w-min w-full py-4.5',
                    tabTriggerClassName
                  )}
                  onClick={() => handleSelectedTab(tab)}
                >
                  <span>{tab.label}</span>
                  {showCount && tab?.count !== undefined && (
                    <span
                      className={cn(
                        'flex items-center justify-center w-[26px] h-[26px] rounded-[4px] text-[10px] font-semibold bg-gray-light-4 text-foreground',
                        {
                          'bg-tertiary text-background':
                            tab.value === selectedValue && isDefaultVariant,
                          'text-tertiary w-auto h-auto text-xs':
                            tab.value === selectedValue && !isDefaultVariant
                        }
                      )}
                    >
                      {renderCountLabel(tab?.count)}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}

            {rightContent && (
              <div
                className={cn('flex justify-end flex-1', rightContentClassName)}
              >
                {rightContent}
              </div>
            )}
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
};
