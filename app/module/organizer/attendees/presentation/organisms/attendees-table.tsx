'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Text
} from '@/app/core/shared/components/atoms';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import {
  DataTable,
  TableSearchInput,
  TableTabs
} from '@/app/core/shared/components/molecules';
import { ORGANIZER_APP_ROUTES } from '@/app/core/shared/constants';
import {
  useQueryFilters,
  useTable,
  useTablePagination
} from '@/app/core/shared/hooks';
import { formatDate } from '@/app/core/shared/lib';
import { cn } from '@/app/core/shared/utils';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { IAttendee, useOrganizerAttendees } from '../../hooks';

const TABLE_TABS = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Inactive',
    value: 'inactive'
  }
];

export const AttendeesTable = () => {
  const router = useRouter();
  const { setFilterParams, filter } = useQueryFilters([
    'email',
    'page',
    'status'
  ]);

  const {
    attendees,
    isLoadingAttendees,
    isRefetchingAttendees,
    paginationMeta
  } = useOrganizerAttendees(filter);

  const columns: ColumnDef<IAttendee>[] = [
    {
      id: 'attendee',
      header: 'Attendee',
      cell: ({ row }) => {
        const original = row.original;
        const hasLogo = !!original?.logoUrl;

        return (
          <div>
            <div className="flex gap-1 items-center">
              <div className="w-[45px] h-[45px] overflow-hidden">
                {hasLogo ? (
                  <Image
                    src={original?.logoUrl}
                    alt={original?.username || 'logo'}
                    width={45}
                    height={45}
                    className="border-input rounded object-contain h-full w-full"
                  />
                ) : (
                  <ImagePlaceholder
                    label="Logo"
                    className="border-input rounded object-contain h-full w-full text-xs"
                  />
                )}
              </div>
              <Text>
                <span className="font-semibold  text-xs block w-[150px] whitespace-pre-wrap break-words">
                  {original?.contactName ?? original?.username}
                </span>
              </Text>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'chatUnlocked',
      header: 'Chat Unlocked',
      cell: ({ row }) => {
        const isChatUnlocked = row.original?.chatUnlocked;

        const label = isChatUnlocked ? 'Yes' : 'No';

        return (
          <div className="w-[36px] h-[25px] flex items-center justify-center rounded-[20px] bg-[#98F0C0]">
            <Text>
              <span className="text-foreground font-semibold">{label}</span>
            </Text>
          </div>
        );
      }
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('email')}</span>
        </Text>
      )
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => (
        <Text>
          <span>{row.getValue('phone')}</span>
        </Text>
      )
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
      accessorKey: 'registeredAt',
      header: 'Registered Date',
      cell: ({ row }) => (
        <Text>
          <span>
            {row.getValue('registeredAt')
              ? formatDate(row.getValue('registeredAt') as string)
              : 'N/A'}
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
                  router.push(
                    ORGANIZER_APP_ROUTES.attendees.detail(row.original.id)
                  );
                }}
                className="cursor-pointer text-xs"
              >
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

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
      email: value
    });
  };

  const { table } = useTable({
    columns: columns,
    data: attendees,
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
              placeholder="Search by email..."
              handleSearch={handleSearch}
            />
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          table={table}
          isLoading={isLoadingAttendees}
          isRefetching={isRefetchingAttendees}
          handleGoToFirstPage={handleGoToFirstPage}
          handleGoToPrevPage={handleGoToPrevPage}
          handleGoToNextPage={handleGoToNextPage}
          handleGoToLastPage={handleGoToLastPage}
        />
      </div>
    </>
  );
};
