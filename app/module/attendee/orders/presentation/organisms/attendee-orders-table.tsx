'use client';

import { Button, Text } from '@/app/core/shared/components/atoms';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import {
  BorderTab,
  DataTable,
  TableSearchInput
} from '@/app/core/shared/components/molecules';
import {
  useQueryFilters,
  useTable,
  useTablePagination
} from '@/app/core/shared/hooks';
import { formatDate } from '@/app/core/shared/lib';
import { cn, formatCurrency } from '@/app/core/shared/utils';
import { OrderStatus } from '@/app/module/exhibitor/orders/hooks';
import { ORDER_STATUS_MAP } from '@/app/module/exhibitor/orders/presentation/organisms';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { IAttendeeOrder, useAttendeeOrders } from '../../api';

export const AttendeeOrdersTable = () => {
  const ORDER_TAB_LIST = [
    {
      label: 'All Orders',
      value: 'all'
    },
    {
      label: 'Pending',
      value: OrderStatus.PENDING,
      count: 0
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

  const { setFilterParams, filter } = useQueryFilters(['page']);

  const { orders, isLoadingOrders, isRefetchingOrders, paginationMeta } =
    useAttendeeOrders({
      ...filter,
      status: filter.status !== 'all' ? filter.status : ''
    });

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

  const handleSearch = (value: string) => {
    setFilterParams({
      search: value?.trim()
    });
  };

  const columns: ColumnDef<IAttendeeOrder>[] = [
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
      accessorKey: 'exhibitor',
      header: 'Exhibitor',
      cell: ({ row }) => {
        const original = row.original;
        const exhibitor = original?.exhibitor;
        return (
          <Text>
            <span>{exhibitor?.companyName || '---'}</span>
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
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: ({ row }) => {
        const original = row.original;
        const orderId = original?.id;

        console.log(orderId);

        return (
          <Button
            variant="ghost"
            className="h-[32px] text-tertiary text-sm"
            onClick={() => {
              // router.push(EXHIBITOR_APP_ROUTES.inventory.orders.detail(orderId))
            }}
          >
            View
          </Button>
        );
      }
    }
  ];

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
    <>
      <div className="flex flex-col gap-y-4">
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
    </>
  );
};
