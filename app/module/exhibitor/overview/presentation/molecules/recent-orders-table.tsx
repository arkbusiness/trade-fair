'use client';

import { useTable, useTablePagination } from '@/app/core/shared/hooks';
import { InventoryStatus } from '../../../inventory/hooks';
import { LinkButton, Text } from '@/app/core/shared/components/atoms';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/app/core/shared/lib';
import { DataTable } from '@/app/core/shared/components/molecules';
import { cn, getStatusStyle } from '@/app/core/shared/utils';
import {
  CircleAlert,
  CircleCheckBig,
  CircleX,
  ReceiptText,
  Truck
} from 'lucide-react';
import { StatusStyleEnum } from '@/app/core/shared/types';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';

const DATA = [
  {
    id: 1,
    customer: 'John Doe',
    product: 'Product 1',
    status: InventoryStatus.PENDING,
    date: '2022-01-01'
  },
  {
    id: 2,
    customer: 'John Doe',
    product: 'Product 2',
    status: InventoryStatus.CONFIRMED,
    date: '2022-01-02'
  },
  {
    id: 3,
    customer: 'John Doe',
    product: 'Product 3',
    status: InventoryStatus.CANCELLED,
    date: '2022-01-03'
  },
  {
    id: 4,
    customer: 'John Doe',
    product: 'Product 4',
    status: InventoryStatus.COMPLETED,
    date: '2022-01-04'
  },
  {
    id: 5,
    customer: 'John Doe',
    product: 'Product 5',
    status: InventoryStatus.SHIPPED,
    date: '2022-01-05'
  },
  {
    id: 6,
    customer: 'John Doe',
    product: 'Product 6',
    status: InventoryStatus.INVOICE,
    date: '2022-01-06'
  }
];

export const RecentOrdersTable = () => {
  // TODO: ORDER DATA SHOULD BE LIMITED TO 4
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('id')}</span>
        </Text>
      )
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('customer') || '---'}</span>
        </Text>
      )
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('product') || '---'}</span>
        </Text>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original?.status?.toUpperCase() as InventoryStatus;

        const mapStatus = {
          [InventoryStatus.PENDING]: {
            icon: CircleAlert,
            label: 'Pending',
            style: getStatusStyle(StatusStyleEnum.WARNING)
          },
          [InventoryStatus.CONFIRMED]: {
            icon: CircleCheckBig,
            label: 'Confirmed',
            style: getStatusStyle(StatusStyleEnum.SUCCESS)
          },
          [InventoryStatus.CANCELLED]: {
            icon: CircleX,
            label: 'Cancelled',
            style: getStatusStyle(StatusStyleEnum.DANGER)
          },
          [InventoryStatus.COMPLETED]: {
            icon: CircleCheckBig,
            label: 'Completed',
            style: getStatusStyle(StatusStyleEnum.SUCCESS)
          },
          [InventoryStatus.SHIPPED]: {
            icon: Truck,
            label: 'Shipped',
            style: getStatusStyle(StatusStyleEnum.INFO)
          },
          [InventoryStatus.INVOICE]: {
            icon: ReceiptText,
            label: 'Invoice',
            style: getStatusStyle(StatusStyleEnum.DEFAULT)
          }
        };

        const content = mapStatus[status];

        return (
          <span
            className={cn(
              'px-2 h-[26px] w-[95px] rounded-[20px] text-xs flex justify-center items-center gap-1 relative font-medium',
              content.style.bg,
              content.style.text
            )}
          >
            <content.icon size={14} />
            <span> {content.label}</span>
          </span>
        );
      }
    },
    {
      accessorKey: 'date',
      header: 'Created Date',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('date')
              ? formatDate(row.getValue('date') as string)
              : 'Not created'}
          </span>
        </Text>
      )
    }
  ];

  const { table, manualPagination } = useTable({
    columns: columns,
    pageSize: 4,
    data: DATA,
    manualPagination: false,
    total: DATA.length ?? 0
  });

  const {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  } = useTablePagination({ table, manualPagination });

  return (
    <div className="rounded-[8px] border border-input bg-background">
      <h2 className="text-lg font-semibold text-foreground px-3.5 py-4.5 border-b">
        Recent Orders
      </h2>
      <div className="px-5 mt-4">
        <DataTable
          table={table}
          columns={columns}
          theadClassName="text-xs text-secondary font-medium"
          cardClassName="border-0"
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
          showPagination={false}
        />
        <div className="my-4 px-2">
          <LinkButton
            variant="tertiary"
            className="w-[6.75rem]"
            href={EXHIBITOR_APP_ROUTES.products.root()}
          >
            View All Orders
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
