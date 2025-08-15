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
import {
  DataTable,
  TableSearchInput,
  TableTabs
} from '@/app/core/shared/components/molecules';
import {
  useQueryFilters,
  useTable,
  useTablePagination
} from '@/app/core/shared/hooks';
import { formatDate } from '@/app/core/shared/lib';
import { cn } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { IBooth, useBooths } from '../../hooks';
import { BoothForm } from '../molecules';

enum ModalType {
  NONE = 'NONE',
  ADD_BOOTH = 'ADD_BOOTH',
  EDIT_BOOTH = 'EDIT_BOOTH',
  DELETE_BOOTH = 'DELETE_BOOTH',
  ASSIGN_EXHIBITOR = 'ASSIGN_EXHIBITOR',
  VIEW_BOOTH = 'VIEW_BOOTH'
}

const TABLE_TABS = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Assigned',
    value: 'assigned'
  },
  {
    label: 'Available',
    value: 'available'
  }
];

export const BoothsTable = () => {
  const { setFilterParams, filter } = useQueryFilters([
    'status',
    'search',
    'page'
  ]);

  const [selectedBooth, setSelectedBooth] = useState<IBooth | null>(null);
  const {
    booths,
    isLoadingBooths,
    isRefetchingBooths,
    refetchBooths,
    paginationMeta
  } = useBooths(filter);

  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const columns: ColumnDef<IBooth>[] = [
    {
      accessorKey: 'number',
      header: 'Booth number',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('number')}</span>
        </Text>
      )
    },
    {
      accessorKey: 'categoryName',
      header: 'Category',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('categoryName')}</span>
        </Text>
      )
    },
    {
      accessorKey: 'Exhibitor',
      header: 'Exhibitor',
      cell: ({ row }) => {
        const exhibitor = row.original?.exhibitor;
        const hasExhibitor = !!exhibitor;

        return (
          <div className="w-[200px] whitespace-break-spaces line-clamp-1">
            {hasExhibitor ? (
              <div className="flex gap-1 items-center">
                <Image
                  src={exhibitor?.logoUrl || 'https://placehold.co/45/png'}
                  alt={exhibitor?.companyName || ''}
                  width={45}
                  height={45}
                  className="border-input rounded object-contain"
                />
                <Text>
                  <span className="font-semibold text-foreground text-xs">
                    {exhibitor?.companyName}
                  </span>
                </Text>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Text>
                  <span className="font-medium text-xs text-foreground">
                    Not Exhibitor Assigned
                  </span>
                </Text>
                <button
                  className="flex gap-1 text-light-blue-2 font-medium text-xs items-center cursor-pointer"
                  onClick={() => {
                    setActiveModal(ModalType.ASSIGN_EXHIBITOR);
                  }}
                >
                  <CirclePlus className="stroke-light-blue-2" size={18} />
                  <span>Assign Exhibitor</span>
                </button>
              </div>
            )}
          </div>
        );
      }
    },
    {
      id: 'contact',
      header: 'Contact',
      cell: ({ row }) => {
        const exhibitor = row.original?.exhibitor;
        const hasExhibitor = !!exhibitor;

        return (
          <div className="w-[200px] whitespace-break-spaces line-clamp-1">
            {hasExhibitor ? (
              <div className="flex flex-col gap-1 items-center">
                <Text>
                  <span className="font-semibold text-foreground text-xs inline-block w-full">
                    {exhibitor?.companyName}
                  </span>
                  <span className="text-light-blue-2 font-medium text-xs inline-block w-full">
                    {exhibitor?.companyEmail}
                  </span>
                </Text>
              </div>
            ) : (
              <span>-</span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: 'assigned',
      header: 'Status',
      cell: ({ row }) => {
        const isAssigned = row.original.assigned;
        const assignedLabel = isAssigned ? 'assigned' : 'unassigned';

        const mapStatus = {
          assigned: {
            bg: '#98F0C0',
            text: '#000'
          },
          unassigned: {
            bg: '#FFF8E8',
            text: '#000'
          }
        };

        const style = mapStatus[assignedLabel];

        return (
          <span
            className={cn(
              'px-2 h-[26px] w-[84px] rounded-[20px] text-xs flex justify-center items-center border capitalize'
            )}
            style={{
              backgroundColor: style.bg,
              color: style.text
            }}
          >
            {assignedLabel}
          </span>
        );
      }
    },
    {
      accessorKey: 'assignedAt',
      header: 'Assigned Date',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('assignedAt')
              ? formatDate(row.getValue('assignedAt') as string)
              : 'Not assigned'}
          </span>
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
                onClick={() => {
                  setActiveModal(ModalType.VIEW_BOOTH);
                  setSelectedBooth(row.original);
                }}
                className="cursor-pointer text-xs"
              >
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-xs"
                onClick={() => {
                  setActiveModal(ModalType.EDIT_BOOTH);
                  setSelectedBooth(row.original);
                }}
              >
                Edit booth
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-xs"
                onClick={() => {
                  setActiveModal(ModalType.ASSIGN_EXHIBITOR);
                }}
              >
                Assign exhibitor
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-xs"
                onClick={() => {
                  setActiveModal(ModalType.DELETE_BOOTH);
                  setSelectedBooth(row.original);
                }}
              >
                Delete booth
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const closeModal = () => {
    console.log('closed booth');
    refetchBooths();
    setActiveModal(ModalType.NONE);
  };

  const handleTabChange = (value: string) => {
    if (value === TABLE_TABS[0].value) {
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
      search: value
    });
  };

  const { table } = useTable({
    columns: columns,
    data: booths,
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
      <BoothForm
        isOpen={
          activeModal === ModalType.ADD_BOOTH ||
          activeModal === ModalType.EDIT_BOOTH
        }
        onClose={closeModal}
        selectedBooth={selectedBooth}
      />

      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between gap-x-8 gap-y-5 items-center flex-wrap w-full">
          {/* Tabs */}
          <div>
            <TableTabs
              tabs={TABLE_TABS}
              defaultValue={TABLE_TABS[0].value}
              handleSelectedTab={(tab) => {
                handleTabChange(tab.value);
              }}
            />
          </div>
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
          isLoading={isLoadingBooths}
          isRefetching={isRefetchingBooths}
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
        />
      </div>
    </>
  );
};
