'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  Table as ReactTable
} from '@tanstack/react-table';
import {
  Button,
  Card,
  CardContent,
  Skeleton,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../atoms';
import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '../../utils';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  showSelectedRows?: boolean;
  contentClassName?: string;
  showPagination?: boolean;
  tableFooterArray?: { label: string; value: string }[];
  table: ReactTable<TData>;
  isLoading?: boolean;
  isRefetching?: boolean;
  handleGoToFirstPage: () => void;
  handleGoToPrevPage: () => void;
  handleGoToNextPage: () => void;
  handleGoToLastPage: () => void;
}

export function DataTable<TData>({
  columns,
  table,
  contentClassName,
  handleGoToFirstPage,
  handleGoToPrevPage,
  handleGoToNextPage,
  handleGoToLastPage,
  tableFooterArray = [],
  showSelectedRows = false,
  showPagination = true,
  isRefetching = false,
  isLoading = false
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const isRowGreaterThan10 = rows?.length > 10;

  const hasTableFooter = tableFooterArray?.length > 0;

  const renderSkeletonRows = () => (
    <>
      {Array.from(new Array(8).fill(123456)).map((_, index) => {
        const key = `skeleton-row-${index}`;
        return (
          <TableRow key={key} className="relative z-0">
            {table.getVisibleLeafColumns().map((column) => (
              <TableCell key={column.id}>
                <Skeleton className="px-[16px] py-[20px]" />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );

  const hasData = table.getRowModel().rows?.length > 0;

  return (
    <Card className="w-full max-w-full py-0">
      <CardContent className="p-0">
        <div
          className={cn(
            'relative w-full overflow-y-auto h-auto',
            {
              'h-[540px]': isRowGreaterThan10
            },
            contentClassName
          )}
        >
          <Table className="w-full">
            <TableHeader className="bg-light-gray-2">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const columnDef = header.column.columnDef;
                    const isSortable = columnDef.enableSorting;

                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          'px-[16px] py-[10px] text-foreground text-sm font-medium',
                          {
                            'cursor-pointer select-none': isSortable
                          }
                        )}
                        onClick={() => {
                          if (isSortable) {
                            header.column.toggleSorting();
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {isSortable && (
                            <>
                              {{
                                asc: <ChevronUp size={16} />,
                                desc: <ChevronDown size={16} />
                              }[header.column.getIsSorted() as string] ?? (
                                <ChevronsUpDown size={16} />
                              )}
                            </>
                          )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {hasData && !isLoading && (
                <>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <TableRow
                        data-state={row.getIsSelected() && 'selected'}
                        key={row.id}
                        className="relative z-0  hover:bg-transparent"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="px-[16px] py-[20px]"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </>
              )}

              {/* Loading */}
              {isLoading && renderSkeletonRows()}

              {/* Refetching */}
              {isRefetching && !isLoading && (
                <TableRow className="h-full w-full! absolute left-0 right-0 top-0">
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-full w-full! absolute left-0  top-0"
                  >
                    <div className="flex flex-col items-center justify-center w-full h-full bg-white/30">
                      <Spinner />
                      <span className="text-sm font-medium bg-white/60">
                        Refetching...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* No Data */}
              {!hasData && !isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {hasTableFooter && (
              <TableFooter>
                <TableRow>
                  {tableFooterArray?.map((item) => (
                    <TableCell key={item.label} className="px-[16px] py-[20px]">
                      <span className="text-sm font-semibold">
                        {item.value}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            )}
          </Table>
          <hr />
        </div>
        {showPagination && !isLoading && (
          <div
            className={cn('flex items-center justify-between px-4 py-[20px]', {
              'justify-end': !showSelectedRows
            })}
          >
            {showSelectedRows && (
              <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
            )}
            {showPagination && (
              <div className="flex w-full items-center gap-8 lg:w-fit">
                <div className="flex w-fit items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </div>
                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => handleGoToFirstPage()}
                    disabled={!table.getCanPreviousPage() || isLoading}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeftIcon />
                  </Button>
                  <Button
                    variant="outline"
                    className="size-8"
                    size="icon"
                    onClick={() => handleGoToPrevPage()}
                    disabled={!table.getCanPreviousPage() || isLoading}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon />
                  </Button>
                  <Button
                    variant="outline"
                    className="size-8"
                    size="icon"
                    onClick={() => handleGoToNextPage()}
                    disabled={!table.getCanNextPage() || isLoading}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden size-8 lg:flex"
                    size="icon"
                    onClick={() => handleGoToLastPage()}
                    disabled={!table.getCanNextPage() || isLoading}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRightIcon />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
