'use client';

import { Button, Text } from '@/app/core/shared/components/atoms';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import {
  AppliedFilters,
  BorderTab,
  DataTable,
  TableSearchInput
} from '@/app/core/shared/components/molecules';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import {
  useQueryFilters,
  useTable,
  useTablePagination
} from '@/app/core/shared/hooks';
import { formatDate } from '@/app/core/shared/lib';
import { cn, formatCurrency } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { IOrderItems, OrderStatus, useOrders } from '../../hooks';
import { ExhibitorOrdersStat, OrdersTableFilter } from '../molecules';

const ORDER_TAB_LIST = [
  {
    label: 'All Orders',
    value: 'all'
  },
  {
    label: 'Invoice Requested',
    value: OrderStatus.INVOICE
  },
  {
    label: 'Pending',
    value: OrderStatus.PENDING
  },
  {
    label: 'Confirmed',
    value: OrderStatus.CONFIRMED
  },
  {
    label: 'Cancelled',
    value: OrderStatus.CANCELLED
  },

  {
    label: 'Shipped',
    value: OrderStatus.SHIPPED
  },
  {
    label: 'Completed',
    value: OrderStatus.COMPLETED
  }
];

const INVENTORY_FILTER_LABEL_MAP = {
  currency: 'Currency',
  from: 'From',
  to: 'To'
};

export const ORDER_STATUS_MAP = {
  [OrderStatus.PENDING]: {
    label: 'Pending',
    style: {
      bg: 'bg-yellow-500',
      text: 'text-white'
    }
  },
  [OrderStatus.CONFIRMED]: {
    label: 'Confirmed',
    style: {
      bg: 'bg-green-100/50 border-green-600 border-1',
      text: 'text-green-600'
    }
  },
  [OrderStatus.CANCELLED]: {
    label: 'Cancelled',
    style: {
      bg: 'bg-red-600',
      text: 'text-white'
    }
  },
  [OrderStatus.COMPLETED]: {
    label: 'Completed',
    style: {
      bg: 'bg-green-600',
      text: 'text-white'
    }
  },
  [OrderStatus.SHIPPED]: {
    label: 'Shipped',
    style: {
      bg: 'bg-blue-600',
      text: 'text-white'
    }
  },
  [OrderStatus.INVOICE]: {
    label: 'Invoice Requested',
    style: {
      bg: 'bg-gray-600',
      text: 'text-white'
    }
  }
};

export const OrdersTable = () => {
  const router = useRouter();
  const { setFilterParams, filter, handleClearFilter } = useQueryFilters([
    'page',
    ...Object.keys(INVENTORY_FILTER_LABEL_MAP)
  ]);

  const {
    orders,
    orderStats,
    isLoadingOrders,
    isRefetchingOrders,
    paginationMeta
  } = useOrders(filter);

  const columns: ColumnDef<IOrderItems>[] = [
    {
      id: 'product',
      header: 'Order Details',
      cell: ({ row }) => {
        const original = row.original;
        const currency = original?.currency;
        const items = original?.items;

        const hasMoreThanOneItem = items?.length > 1;
        const hasImage = !!items?.[0]?.product?.images?.[0];

        const productName = items?.[0]?.product?.name;
        const productImage = items?.[0]?.product?.images?.[0];
        const productPrice = items?.[0]?.unitPrice;
        const productQuantity = items?.[0]?.quantity;

        return (
          <div className="flex gap-2 items-center w-[200px]">
            {hasImage && (
              <Image
                src={productImage}
                alt={productName}
                width={45}
                height={45}
                className="rounded-[4px] object-contain"
              />
            )}
            {!hasImage && (
              <ImagePlaceholder
                label="No Image"
                className="w-[60px] h-[60px] rounded-[4px] text-xs"
              />
            )}
            <div className="w-[150px] flex flex-col gap-1">
              {/* Product Name */}
              <Text className="w-full whitespace-pre-wrap break-word text-foreground font-semibold line-clamp-2">
                {productName}
              </Text>

              {/* Quantity */}
              <Text className="w-full whitespace-pre-wrap break-word">
                <span>Quantity: </span>
                <span className="text-foreground">{productQuantity}</span>
              </Text>

              {/* Price */}
              <Text className="w-full whitespace-pre-wrap break-word">
                <span>Price: </span>
                <span className="text-foreground">
                  {formatCurrency({ amount: productPrice, currency })}
                </span>
              </Text>

              {/* Note */}
              {hasMoreThanOneItem && (
                <Text className="w-full whitespace-pre-wrap break-word">
                  <span>Note: </span>
                  <span className="text-foreground">
                    More items are available
                  </span>
                </Text>
              )}
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'attendee',
      header: 'Customer',
      cell: ({ row }) => {
        const original = row.original;
        const attendee = original?.attendee;
        return (
          <Text>
            <span>{attendee?.contactName || '---'}</span>
          </Text>
        );
      }
    },
    {
      id: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const original = row.original;
        const currency = original?.currency;
        const items = original?.items ?? [];

        const total = items?.reduce((acc, item) => {
          return acc + item?.unitPrice * item?.quantity;
        }, 0);

        const formattedPrice = formatCurrency({
          amount: total,
          currency
        });

        return (
          <Text>
            <span>{formattedPrice}</span>
          </Text>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original?.status?.toUpperCase() as OrderStatus;
        const content = ORDER_STATUS_MAP[status];

        return (
          <span
            className={cn(
              'px-3 h-[35px] max-w-min rounded-[4px] text-xs flex justify-center items-center relative font-medium',
              content.style.bg,
              content.style.text
            )}
          >
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
          <span>{formatDate(row.getValue('createdAt'))}</span>
        </Text>
      ),
      enableSorting: true
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const original = row.original;
        const orderId = original?.id;

        return (
          <Button
            variant="highlight"
            className="h-[32px]"
            onClick={() =>
              router.push(EXHIBITOR_APP_ROUTES.inventory.orders.detail(orderId))
            }
          >
            View
          </Button>
        );
      }
    }
  ];

  const handleSearch = (value: string) => {
    setFilterParams({
      search: value?.trim()
    });
  };

  const handleTabChange = (value: string) => {
    if (value === ORDER_TAB_LIST[0].value) {
      setFilterParams({
        status: ''
      });
    } else {
      setFilterParams({
        status: value
      });
    }
  };

  const { table } = useTable({
    columns: columns,
    data: orders,
    total: paginationMeta?.total ?? 0
  });

  const {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  } = useTablePagination({ table });

  return (
    <div className="flex flex-col gap-6">
      <ExhibitorOrdersStat
        isLoading={isLoadingOrders}
        totalSale={orderStats?.totalSales ?? {}}
        invoiceRequested={orderStats?.totalTransactions ?? 0}
        totalCustomers={orderStats?.totalCustomers ?? 0}
      />
      <div className="flex flex-col gap-y-4">
        {/* Applied filters */}
        <div className="flex justify-end w-full">
          <AppliedFilters
            filters={filter}
            labels={INVENTORY_FILTER_LABEL_MAP}
            onClear={handleClearFilter}
          />
        </div>

        <div className="flex justify-between gap-x-8 gap-y-5 items-center flex-wrap w-full">
          <BorderTab
            tabs={ORDER_TAB_LIST}
            defaultValue={ORDER_TAB_LIST[0].value}
            handleSelectedTab={(tab) => {
              handleTabChange(tab.value);
            }}
          />
        </div>

        <div className="flex justify-between gap-x-8 gap-y-5 items-center flex-wrap w-full">
          {/* Search */}
          <div className="xs:max-w-[300px] w-full">
            <TableSearchInput
              placeholder="Search..."
              handleSearch={handleSearch}
            />
          </div>

          {/* FILTER */}
          <OrdersTableFilter handleReset={handleClearFilter} />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          table={table}
          isLoading={isLoadingOrders}
          isRefetching={isRefetchingOrders}
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
        />
      </div>
    </div>
  );
};
