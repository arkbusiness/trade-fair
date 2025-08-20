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
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { formatDate } from '@/app/core/shared/lib';
import { cn, errorHandler } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IOrganizerExhibitor, useOrganizerExhibitors } from '../../hooks';
import { organizerExhibitorsService } from '../../services';
import { BoothMembers } from '../molecules';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import { useRouter } from 'nextjs-toploader/app';

enum ModalType {
  NONE = 'NONE',
  INVITE_EXHIBITOR = 'INVITE_EXHIBITOR',
  VIEW_MEMBER = 'VIEW_MEMBER',
  DELETE_EXHIBITOR = 'DELETE_EXHIBITOR',
  DEACTIVATE_EXHIBITOR = 'DEACTIVATE_EXHIBITOR'
}

const TABLE_TABS = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Registered',
    value: 'registered'
  },
  {
    label: 'Invited',
    value: 'invited'
  }
];

export const ExhibitorTable = () => {
  const router = useRouter();
  const mutation = useCustomMutation();
  const { setFilterParams, filter } = useQueryFilters(['search', 'page']);

  const [selectedExhibitor, setSelectedExhibitor] =
    useState<IOrganizerExhibitor | null>(null);
  const {
    exhibitors,
    isLoadingExhibitors,
    isRefetchingExhibitors,
    refetchExhibitors,
    paginationMeta
  } = useOrganizerExhibitors(filter);

  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const columns: ColumnDef<IOrganizerExhibitor>[] = [
    {
      id: 'exhibitor',
      header: 'Exhibitor',
      cell: ({ row }) => {
        const original = row.original;

        return (
          <div>
            <div className="flex gap-1 items-center">
              <div className="w-[45px] h-[45px] overflow-hidden">
                <Image
                  src={original?.logo || 'https://placehold.co/45/png'}
                  alt={original?.exhibitorCompanyName || ''}
                  width={45}
                  height={45}
                  className="border-input rounded object-contain h-full w-full"
                />
              </div>
              <Text>
                <span className="font-semibold  text-xs block w-[150px] whitespace-pre-wrap break-words">
                  {original?.exhibitorCompanyName ?? original?.email}
                </span>
              </Text>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'boothNumber',
      header: 'Booth Number',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('boothNumber')}</span>
        </Text>
      )
    },
    {
      accessorKey: 'boothMembers',
      header: 'Booth Members',
      cell: ({ row }) => {
        const { boothMembers, totalPossibleExhibitorMembers } = row.original;

        return (
          <div className="w-[40px] h-[25px] flex items-center justify-center rounded-[20px] border border-light-blue-2">
            <Text>
              <span className="text-light-blue-2 font-semibold">
                {boothMembers}/{totalPossibleExhibitorMembers}
              </span>
            </Text>
          </div>
        );
      }
    },
    {
      id: 'contact',
      header: 'Contact',
      cell: ({ row }) => {
        const original = row.original;
        const hasNameAndEmail =
          !!original?.exhibitorName && !!original?.exhibitorEmail;

        return (
          <div className="flex flex-col gap-1">
            {hasNameAndEmail ? (
              <div className="w-[240px] flex flex-col">
                <span className="font-semibold text-foreground text-xs inline-block w-full whitespace-pre-wrap break-words">
                  {original?.exhibitorName ?? '-'}
                </span>
                <span className="text-light-blue-2 font-medium text-xs inline-block w-full whitespace-pre-wrap break-words">
                  {original?.exhibitorEmail ?? '-'}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-foreground text-xs inline-block w-full">
                N/A
              </span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const isActive = row.original?.status?.toLowerCase() === 'active';
        const label = isActive ? 'active' : 'inactive';

        const mapStatus = {
          active: {
            bg: '#98F0C0',
            text: '#000'
          },
          inactive: {
            bg: '#FFF8E8',
            text: '#000'
          }
        };

        const style = mapStatus[label];

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
            {label}
          </span>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Created Date',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('createdAt')
              ? formatDate(row.getValue('createdAt') as string)
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
        const isActive = row.original?.status?.toLowerCase() === 'active';

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
                  router.push(
                    ORGANIZER_APP_ROUTES.exhibitors.detail(row.original.id)
                  );
                }}
                className="cursor-pointer text-xs"
              >
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setActiveModal(ModalType.VIEW_MEMBER);
                  setSelectedExhibitor(row.original);
                }}
                className="cursor-pointer text-xs"
              >
                View members
              </DropdownMenuItem>
              {isActive && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      setActiveModal(ModalType.DEACTIVATE_EXHIBITOR);
                      setSelectedExhibitor(row.original);
                    }}
                  >
                    Deactivate exhibitor
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-xs"
                onClick={() => {
                  setActiveModal(ModalType.DELETE_EXHIBITOR);
                  setSelectedExhibitor(row.original);
                }}
              >
                Delete exhibitor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const handleCloseModal = () => {
    refetchExhibitors();
    setActiveModal(ModalType.NONE);
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

  const handleConfirmDeactivate = () => {
    if (!selectedExhibitor) return;

    mutation.mutate(
      organizerExhibitorsService.deactivateExhibitor(selectedExhibitor?.id),
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          toast.success('Exhibitor deactivated successfully.');
          handleCloseModal();
        }
      }
    );
  };

  const handleConfirmDelete = () => {
    if (!selectedExhibitor) return;

    mutation.mutate(
      organizerExhibitorsService.deleteExhibitor(selectedExhibitor?.id),
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          toast.success('Exhibitor deleted successfully.');
          handleCloseModal();
        }
      }
    );
  };

  const handleConfirm = () => {
    if (activeModal === ModalType.DELETE_EXHIBITOR) {
      handleConfirmDelete();
    } else if (activeModal === ModalType.DEACTIVATE_EXHIBITOR) {
      handleConfirmDeactivate();
    }
  };

  const { table } = useTable({
    columns: columns,
    data: exhibitors,
    total: paginationMeta?.total ?? 0
  });

  const {
    handleGoToFirstPage,
    handleGoToPrevPage,
    handleGoToNextPage,
    handleGoToLastPage
  } = useTablePagination({ table });

  const confirmModal = {
    [ModalType.DELETE_EXHIBITOR]: {
      title: 'Delete Exhibitor',
      description: 'Are you sure you want to delete this exhibitor?'
    },
    [ModalType.DEACTIVATE_EXHIBITOR]: {
      title: 'Deactivate Exhibitor',
      description: 'Are you sure you want to deactivate this exhibitor?'
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
      {/* <BoothForm
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
      /> */}

      <BoothMembers
        isOpen={activeModal === ModalType.VIEW_MEMBER}
        selectedExhibitor={selectedExhibitor?.boothMembersList ?? []}
        handleClose={handleCloseModal}
      />

      <ConfirmationModal
        isOpen={
          activeModal === ModalType.DELETE_EXHIBITOR ||
          activeModal === ModalType.DEACTIVATE_EXHIBITOR
        }
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        isLoading={mutation.isPending}
        title={confirmModal[activeModal]?.title}
        description={confirmModal[activeModal]?.description}
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
          isLoading={isLoadingExhibitors}
          isRefetching={isRefetchingExhibitors}
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
        />
      </div>
    </>
  );
};
