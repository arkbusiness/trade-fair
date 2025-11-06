'use client';

import { Text } from '@/app/core/shared/components/atoms';
import { DataTable } from '@/app/core/shared/components/molecules';
import { useTable, useTablePagination } from '@/app/core/shared/hooks';
import { IOrderItem } from '@/app/module/exhibitor/orders/api';
import { ColumnDef } from '@tanstack/react-table';
import { useAttendeeOrderById } from '../../api';
import { formatCurrency } from '@/app/core/shared/utils';

interface AttendeeOrderItemsProps {
  orderId: string;
}

export const AttendeeOrderItems = ({ orderId }: AttendeeOrderItemsProps) => {
  const { order, isLoadingOrder, isRefetchingOrder } =
    useAttendeeOrderById(orderId);
  const currency = order?.currency;

  const items = order?.items ?? [];

  const columns: ColumnDef<IOrderItem>[] = [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.original?.product;
        return (
          <Text className="w-[250px] break-words whitespace-pre-wrap line-clamp-1">
            <span>{product?.name || '---'}</span>
          </Text>
        );
      }
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => {
        const quantity = row.original?.quantity;
        return (
          <Text>
            <span>{quantity || '---'}</span>
          </Text>
        );
      }
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = row.original?.unitPrice;
        return (
          <Text>
            <span>{price || '---'}</span>
          </Text>
        );
      }
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const total = row.original?.unitPrice * row.original?.quantity;
        return (
          <Text>
            <span>{total || '---'}</span>
          </Text>
        );
      }
    }
  ];

  const totalAmount = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const tableFooterArray = [
    {
      label: 'footer-01',
      value: ''
    },
    {
      label: 'footer-02',
      value: ''
    },
    {
      label: 'footer-03',
      value: ''
    },
    {
      label: 'Total',
      value: `Total Amount: ${formatCurrency({
        amount: totalAmount,
        currency
      })}`
    }
  ];

  const { table, manualPagination } = useTable({
    columns: columns,
    pageSize: 4,
    data: items || [],
    manualPagination: false,
    total: items.length ?? 0
  });

  const {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  } = useTablePagination({ table, manualPagination });

  return (
    <div>
      <h2 className="font-medium opacity-80 pl-8 mb-3">INVOICE ITEMS</h2>
      <DataTable
        table={table}
        columns={columns}
        theadClassName="text-xs text-secondary font-medium bg-gray-light-3"
        tbodyClassName="bg-transparent"
        cardClassName="border-0"
        handleGoToFirstPage={handleGoToFirstPage}
        handleGoToPrevPage={handleGoToPrevPage}
        handleGoToNextPage={handleGoToNextPage}
        handleGoToLastPage={handleGoToLastPage}
        tableFooterArray={tableFooterArray}
        showPagination={false}
        isLoading={isLoadingOrder}
        isRefetching={isRefetchingOrder}
      />
    </div>
  );
};
