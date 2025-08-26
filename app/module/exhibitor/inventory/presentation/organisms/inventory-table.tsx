'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text
} from '@/app/core/shared/components/atoms';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import {
  AppliedFilters,
  ConfirmationModal,
  DataTable,
  TableSearchInput
} from '@/app/core/shared/components/molecules';
import {
  useQueryFilters,
  useTable,
  useTablePagination
} from '@/app/core/shared/hooks';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { formatDate } from '@/app/core/shared/lib';
import { errorHandler, formatCurrency } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Inventory, useInventory } from '../../hooks';
import { inventoryService } from '../../services';
import { InventoryTableFilter } from '../molecules';

enum ModalType {
  NONE = 'NONE',
  DELETE_INVENTORY = 'DELETE_INVENTORY'
}

const INVENTORY_FILTER_LABEL_MAP = {
  maxPrice: 'Max Price',
  minPrice: 'Min Price',
  sortBy: 'Sort By',
  order: 'Order By',
  categoryId: 'Category'
};

export const InventoryTable = () => {
  const mutation = useCustomMutation();
  const { setFilterParams, filter, handleClearFilter } = useQueryFilters([
    'page',
    ...Object.keys(INVENTORY_FILTER_LABEL_MAP)
  ]);

  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(
    null
  );
  const {
    inventory,
    isLoadingInventory,
    isRefetchingInventory,
    refetchInventory,
    paginationMeta
  } = useInventory(filter);

  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const columns: ColumnDef<Inventory>[] = [
    {
      id: 'product',
      header: 'Name',
      cell: ({ row }) => {
        const original = row.original;
        const productName = original?.name;
        const productImage = original?.images?.[0];

        const hasImage = !!productImage;

        return (
          <div className="flex gap-1 items-center w-[200px]">
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
            <Text className="w-[150px] whitespace-pre-wrap break-word">
              {productName}
            </Text>
          </div>
        );
      }
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('sku') || '---'}</span>
        </Text>
      )
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('quantity') || '---'}</span>
        </Text>
      )
    },
    {
      accessorKey: 'basePrice',
      header: 'Base Price',
      cell: ({ row }) => {
        const original = row.original;
        const basePrice = original?.basePrice;
        const currency = original?.currency;

        const formattedPrice = formatCurrency({
          amount: basePrice,
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
      accessorKey: 'createdAt',
      header: 'Date Created',
      cell: ({ row }) => (
        <Text>
          <span>{formatDate(row.getValue('createdAt'))}</span>
        </Text>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'updatedAt',
      header: 'Date Updated',
      cell: ({ row }) => (
        <Text>
          <span>{formatDate(row.getValue('updatedAt'))}</span>
        </Text>
      ),
      enableSorting: true
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {}}
                className="cursor-pointer text-xs"
              >
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-xs"
                onClick={() => {}}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-xs"
                onClick={() => {
                  setActiveModal(ModalType.DELETE_INVENTORY);
                  setSelectedInventory(row.original);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const handleCloseModal = () => {
    if (mutation.isPending) return;
    refetchInventory();
    setActiveModal(ModalType.NONE);
  };

  const handleSearch = (value: string) => {
    setFilterParams({
      search: value?.trim()
    });
  };

  const handleConfirmDelete = () => {
    if (!selectedInventory) return;

    mutation.mutate(inventoryService.deleteInventory(selectedInventory?.id), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Product deleted successfully.');
        handleCloseModal();
      }
    });
  };

  const handleConfirm = () => {
    switch (activeModal) {
      case ModalType.DELETE_INVENTORY:
        handleConfirmDelete();
        break;
    }
  };

  const { table } = useTable({
    columns: columns,
    data: inventory,
    total: paginationMeta?.total ?? 0
  });

  const {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  } = useTablePagination({ table });

  const confirmModal = {
    [ModalType.DELETE_INVENTORY]: {
      title: 'Delete Product',
      description: 'Are you sure you want to delete this product?'
    },
    [ModalType.NONE]: {
      title: '',
      description: ''
    }
  } as Record<
    ModalType,
    { title: string; description: string; onConfirm: () => void }
  >;

  return (
    <>
      <ConfirmationModal
        title={confirmModal[activeModal]?.title}
        description={confirmModal[activeModal]?.description}
        isOpen={activeModal === ModalType.DELETE_INVENTORY}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        isLoading={mutation.isPending}
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
          {/* Search */}
          <div className="xs:max-w-[300px] w-full">
            <TableSearchInput
              placeholder="Search..."
              handleSearch={handleSearch}
            />
          </div>

          {/* FILTER */}
          <div>
            <InventoryTableFilter handleReset={handleClearFilter} />
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          table={table}
          isLoading={isLoadingInventory}
          isRefetching={isRefetchingInventory}
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
        />
      </div>
    </>
  );
};
