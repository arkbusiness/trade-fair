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
  ConfirmationModal,
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
import { cn, errorHandler } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import { CirclePlus, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { IBooth, useBooths } from '../../hooks';
import { AssignExhibitorForm, BoothDetails, BoothForm } from '../molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { boothsService } from '../../services';
import toast from 'react-hot-toast';

enum ModalType {
  NONE = 'NONE',
  ADD_BOOTH = 'ADD_BOOTH',
  EDIT_BOOTH = 'EDIT_BOOTH',
  DELETE_BOOTH = 'DELETE_BOOTH',
  ASSIGN_EXHIBITOR = 'ASSIGN_EXHIBITOR',
  UNASSIGN_EXHIBITOR = 'UNASSIGN_EXHIBITOR',
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
    label: 'Unassigned',
    value: 'available'
  }
];

export const BoothsTable = () => {
  const mutation = useCustomMutation();
  const { setFilterParams, filter } = useQueryFilters([
    'filter',
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
        const original = row.original;
        const hasExhibitor = !!original?.exhibitorId;
        const exhibitorName = original?.exhibitorName;
        const exhibitorLogo = original?.logoUrl;

        return (
          <div>
            {hasExhibitor ? (
              <div className="flex gap-1 items-center">
                <Image
                  src={exhibitorLogo || 'https://placehold.co/45/png'}
                  alt={exhibitorName || ''}
                  width={45}
                  height={45}
                  className="border-input rounded object-contain"
                />
                <Text>
                  <span className="font-semibold text-foreground text-xs  w-[150px] whitespace-pre-wrap break-word">
                    {exhibitorName}
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
        const original = row.original;
        const hasExhibitor = !!original?.exhibitorId;
        const exhibitorName = original?.exhibitorName;
        const exhibitorEmail = original?.exhibitorEmail;

        return (
          <div>
            {hasExhibitor ? (
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-xs inline-block  w-[240px] whitespace-pre-wrap break-words">
                  {exhibitorName}
                </span>
                <span className="text-light-blue-2 font-medium text-xs inline-block  w-[240px] whitespace-pre-wrap break-word">
                  {exhibitorEmail}
                </span>
              </div>
            ) : (
              <span>-</span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const isAssigned = row.original?.status?.toLowerCase() === 'assigned';
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
      accessorKey: 'createdAt',
      header: 'Created Date',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('createdAt')
              ? formatDate(row.getValue('createdAt') as string)
              : 'Not created'}
          </span>
        </Text>
      ),
      enableSorting: true
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const isAssigned = row.original?.status?.toLowerCase() === 'assigned';

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
                  if (isAssigned) {
                    setActiveModal(ModalType.UNASSIGN_EXHIBITOR);
                  } else {
                    setActiveModal(ModalType.ASSIGN_EXHIBITOR);
                  }

                  setSelectedBooth(row.original);
                }}
              >
                {isAssigned ? 'Unassign exhibitor' : 'Assign exhibitor'}
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

  const handleCloseModal = () => {
    refetchBooths();
    setActiveModal(ModalType.NONE);
  };

  const handleEditBooth = (booth: IBooth) => {
    setSelectedBooth(booth);
    setActiveModal(ModalType.EDIT_BOOTH);
  };

  const handleTabChange = (value: string) => {
    if (value === TABLE_TABS[0].value) {
      setFilterParams({
        filter: ''
      });
    } else {
      setFilterParams({
        filter: value
      });
    }
  };

  const handleSearch = (value: string) => {
    setFilterParams({
      search: value
    });
  };

  const handleConfirmDelete = () => {
    if (!selectedBooth) return;

    mutation.mutate(boothsService.deleteBooth(selectedBooth?.id), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Booth deleted successfully.');
        handleCloseModal();
      }
    });
  };

  const handleConfirmUnassign = () => {
    if (!selectedBooth) return;

    mutation.mutate(boothsService.unassignExhibitor(selectedBooth?.id), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Booth unassigned successfully.');
        handleCloseModal();
      }
    });
  };

  const handleConfirm = () => {
    switch (activeModal) {
      case ModalType.DELETE_BOOTH:
        handleConfirmDelete();
        break;
      case ModalType.UNASSIGN_EXHIBITOR:
        handleConfirmUnassign();
        break;
    }
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

  const confirmModal = {
    [ModalType.DELETE_BOOTH]: {
      title: 'Delete Booth',
      description: 'Are you sure you want to delete this booth?'
    },
    [ModalType.UNASSIGN_EXHIBITOR]: {
      title: 'Unassign Booth',
      description:
        'Are you sure you want to unassign exhibitor from this booth?'
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
      <BoothForm
        isOpen={
          activeModal === ModalType.ADD_BOOTH ||
          activeModal === ModalType.EDIT_BOOTH
        }
        onClose={handleCloseModal}
        selectedBooth={selectedBooth}
      />

      <BoothDetails
        isOpen={activeModal === ModalType.VIEW_BOOTH}
        handleClose={handleCloseModal}
        handleEdit={handleEditBooth}
        selectedBooth={selectedBooth}
      />

      <AssignExhibitorForm
        isOpen={activeModal === ModalType.ASSIGN_EXHIBITOR}
        onClose={handleCloseModal}
        selectedBooth={selectedBooth}
      />

      <ConfirmationModal
        title={confirmModal[activeModal]?.title}
        description={confirmModal[activeModal]?.description}
        isOpen={
          activeModal === ModalType.DELETE_BOOTH ||
          activeModal === ModalType.UNASSIGN_EXHIBITOR
        }
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        isLoading={mutation.isPending}
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
