'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../atoms';
import { cn } from '../../utils';

export function DataTableSkeleton() {
  return (
    <Card className="w-full max-w-full py-0">
      <CardContent className="p-0">
        <div className={cn('relative w-full overflow-y-auto h-auto')}>
          <Table className="w-full">
            <TableHeader className="bg-transparent">
              {Array.from(new Array(8).fill(1)).map((_, index) => {
                const key = `skeleton-heading-${index}`;
                return (
                  <TableRow
                    key={key}
                    className="relative z-0  hover:bg-highlight/50"
                  >
                    {Array.from(new Array(8).fill(123456)).map((_, index) => {
                      const key = `skeleton-heading-cell-${index}`;
                      return (
                        <TableHead key={key}>
                          <Skeleton className="px-[16px] py-[10px]" />
                        </TableHead>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableHeader>

            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {Array.from(new Array(8).fill(1)).map((_, index) => {
                const key = `skeleton-row-${index}`;
                return (
                  <TableRow
                    key={key}
                    className="relative z-0  hover:bg-highlight/50"
                  >
                    {Array.from(new Array(8).fill(123456)).map((_, index) => {
                      const key = `skeleton-cell-${index}`;
                      return (
                        <TableCell key={key}>
                          <Skeleton className="px-[16px] py-[20px]" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <hr />
        </div>
      </CardContent>
    </Card>
  );
}
