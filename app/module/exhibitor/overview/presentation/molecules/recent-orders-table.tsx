'use client';

import { LinkButton, Text } from '@/app/core/shared/components/atoms';
import { DataTable } from '@/app/core/shared/components/molecules';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { useTable, useTablePagination } from '@/app/core/shared/hooks';
import { distanceFormat } from '@/app/core/shared/lib';
import { StatusStyleEnum } from '@/app/core/shared/types';
import { cn, getStatusStyle } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import {
  CircleAlert,
  CircleCheckBig,
  CircleX,
  ReceiptText,
  Truck
} from 'lucide-react';
import { InventoryStatus } from '../../../inventory/hooks';
import { IExhibitorLatestOrder, useExhibitorOverview } from '../../hooks';

export const RecentOrdersTable = () => {
  const { isLoadingOverviewStats, isRefetchingOverviewStats, overviewStats } =
    useExhibitorOverview();

  const orders = overviewStats?.latestOrders ?? [];

  const columns: ColumnDef<IExhibitorLatestOrder>[] = [
    // {
    //   accessorKey: 'id',
    //   header: 'Order ID',
    //   cell: ({ row }) => (
    //     <Text>
    //       <span>{row.getValue('id')}</span>
    //     </Text>
    //   )
    // },
    {
      id: 'customer',
      header: 'Customer',
      cell: ({ row }) => {
        const attendee = row.original?.attendee;
        return (
          <Text>
            <span>{attendee?.contactName || '---'}</span>
          </Text>
        );
      }
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.original?.items ?? [];
        const productName = product.map((item) => item.product.name).join(', ');
        return (
          <Text className="w-[250px] break-words  whitespace-pre-wrap">
            <span>{productName || '---'}</span>
          </Text>
        );
      }
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
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('createdAt')
              ? distanceFormat(row.getValue('createdAt') as string)
              : 'Not created'}
          </span>
        </Text>
      )
    }
  ];

  const { table, manualPagination } = useTable({
    columns: columns,
    pageSize: 4,
    data: orders,
    manualPagination: false,
    total: orders.length ?? 0
  });

  const {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  } = useTablePagination({ table, manualPagination });

  return (
    <div className="rounded-[8px] border border-input bg-background flex flex-col">
      <h2 className="text-lg font-semibold text-foreground px-3.5 py-4.5 border-b">
        Recent Orders
      </h2>
      <div className="px-5 mt-4 flex-1">
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
          isLoading={isLoadingOverviewStats}
          isRefetching={isRefetchingOverviewStats}
        />
      </div>
      <div className="my-4 px-4">
        <LinkButton
          variant="tertiary"
          className="w-[6.75rem]"
          href={EXHIBITOR_APP_ROUTES.inventory.root()}
        >
          View All Orders
        </LinkButton>
      </div>
    </div>
  );
};
