'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[] | never[];
  pageSize?: number;
  total?: number;
  page?: string;
  columnFilters?: ColumnFiltersState;
  manualPagination?: boolean;
  onFilterChange?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onGlobalFilterChange?(val: string): void;
}

const emptyArray: never[] = []; // Fixes table.getRowModel().rows multiple rendering

export const useTable = <TData>({
  columns,
  data,
  total,
  page,
  onGlobalFilterChange,
  onFilterChange,
  columnFilters = emptyArray,
  manualPagination = true,
  pageSize = 8
}: DataTableProps<TData>) => {
  const searchParams = useSearchParams();
  const currentPage = page ? page : (searchParams.get('page') ?? '1');

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? emptyArray,
    columns,
    state: {
      pagination: {
        pageIndex: parseInt(currentPage) - 1,
        pageSize
      },
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    manualPagination,
    rowCount: total,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: onFilterChange,
    onGlobalFilterChange: onGlobalFilterChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return {
    hasData: data && data?.length > 0,
    table,
    manualPagination,
    pageSize
  };
};

export interface IPagination {
  page_count: number;
  current_page: number;
  per_page: number;
}
