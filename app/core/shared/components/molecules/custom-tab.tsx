'use client';

import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../atoms';
import { cn } from '../../utils';

interface CustomTabProps {
  items: { value: string; label: string }[];
  value: string;
  handleSelectedTab?(value: string): void;
  tabListClassName?: string;
  children?: ReactNode;
}

export const CustomTab = ({
  items,
  value,
  handleSelectedTab,
  tabListClassName,
  children
}: CustomTabProps) => {
  return (
    <Tabs value={value} className="flex w-full flex-col justify-start gap-6">
      <TabsList
        className={cn(
          'flex bg-highlight py-2 h-auto px-[1rem] rounded-[6px] gap-x-4 w-full flex-wrap',
          tabListClassName
        )}
      >
        {items.map((item) => {
          return (
            <TabsTrigger
              value={item.value}
              key={item.label}
              className="px-[10px] cursor-pointer h-[2.26rem]"
              onClick={() => handleSelectedTab?.(item.value)}
            >
              {item.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children && children}
    </Tabs>
  );
};
