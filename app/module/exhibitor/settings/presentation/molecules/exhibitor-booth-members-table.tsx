'use client';

import { Button, Text } from '@/app/core/shared/components/atoms';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import {
  ConfirmationModal,
  DataTable,
  OverlaySpinner
} from '@/app/core/shared/components/molecules';
import {
  useQueryFilters,
  useTable,
  useTablePagination
} from '@/app/core/shared/hooks';
import { distanceFormat, formatDate } from '@/app/core/shared/lib';
import { errorHandler } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  IExhibitorBoothMembers,
  useExhibitorBoothMembers,
  useDeleteBoothMember
} from '../../api';

enum ModalType {
  DELETE_BOOTH_MEMBER = 'DELETE_BOOTH_MEMBER',
  NONE = 'NONE'
}

export const ExhibitorBoothMembersTable = () => {
  const { deleteBoothMember, isPending } = useDeleteBoothMember({
    onSuccess: () => {
      toast.success('Booth member deleted successfully');
      refetchBoothMembers();
      handleCloseModal();
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });
  const [selectedMember, setSelectedMember] =
    useState<IExhibitorBoothMembers | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const { filter } = useQueryFilters(['page']);

  const {
    isLoadingBoothMembers,
    paginationMeta,
    isRefetchingBoothMembers,
    refetchBoothMembers,
    boothMembers
  } = useExhibitorBoothMembers(filter);

  const columns: ColumnDef<IExhibitorBoothMembers>[] = [
    {
      id: 'member',
      header: 'Name',
      cell: ({ row }) => {
        const member = row.original;
        const username = member?.username;
        const email = member?.email;

        return (
          <div className="flex gap-2 items-center">
            <div>
              <ImagePlaceholder
                label="No Image"
                className="w-[60px] h-[60px] rounded-full text-xs"
              />
            </div>
            <div className=" flex flex-col gap-1">
              <Text className="w-full whitespace-pre-wrap break-word">
                {username && (
                  <span className="text-foreground">{username ?? ''}</span>
                )}
              </Text>
              <Text className="w-full whitespace-pre-wrap break-word">
                <span className="text-light-blue-2 inline-block">{email}</span>
              </Text>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Date Added',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('createdAt')
              ? formatDate(row.getValue('createdAt') as string)
              : 'Not created'}
          </span>
        </Text>
      )
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Active',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('lastLogin')
              ? distanceFormat(row.getValue('lastLogin') as string)
              : 'Not active'}
          </span>
        </Text>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      header: 'Actions',
      cell: ({ row }) => {
        const original = row.original;

        return (
          <Button
            variant="highlight"
            className="h-[32px]"
            onClick={() => {
              setSelectedMember(original);
              setActiveModal(ModalType.DELETE_BOOTH_MEMBER);
            }}
          >
            <Trash />
          </Button>
        );
      }
    }
  ];

  const handleCloseModal = () => {
    if (isPending) return;
    setSelectedMember(null);
    setActiveModal(ModalType.NONE);
    refetchBoothMembers();
  };

  const handleDeleteBoothMember = () => {
    if (!selectedMember?.id) return;
    deleteBoothMember({ id: selectedMember.id });
  };

  const { table } = useTable({
    columns: columns,
    data: boothMembers,
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
      {isRefetchingBoothMembers && <OverlaySpinner />}
      <ConfirmationModal
        isOpen={activeModal === ModalType.DELETE_BOOTH_MEMBER}
        onClose={handleCloseModal}
        title="Delete Booth Member"
        description="Are you sure you want to delete this booth member?"
        isLoading={isPending}
        onConfirm={() => handleDeleteBoothMember()}
      />
      <div className="px-5 mt-12 flex-1">
        <DataTable
          table={table}
          columns={columns}
          theadClassName="text-sm text-foreground font-semibold"
          cardClassName="border-0"
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
          showPagination={false}
          isLoading={isLoadingBoothMembers}
          isRefetching={isRefetchingBoothMembers}
        />
      </div>
    </>
  );
};
