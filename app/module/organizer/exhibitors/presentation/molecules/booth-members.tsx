'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { Modal } from '@/app/core/shared/components/molecules';
import { formatDate } from '@/app/core/shared/lib';
import { cn } from '@/app/core/shared/utils';
import { IExhibitor } from '../../api';

interface BoothDetailsProps {
  isOpen: boolean;
  handleClose: () => void;
  members: IExhibitor['boothMembersList'];
}

const MAX_ITEMS_TO_SHOW = 5;

export const BoothMembers = ({
  isOpen,
  handleClose,
  members = []
}: BoothDetailsProps) => {
  const hasMembers = members?.length > 0;
  const isMaxLength = hasMembers && members?.length > MAX_ITEMS_TO_SHOW;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Booth Members"
      description=""
      contentClassName="px-0 pb-0 overflow-hidden max-w-[37.25rem] sm:max-w-[46.62rem]"
      headerClassName="px-6"
    >
      <div
        className={cn('flex flex-col gap-y-[15px] px-6 h-auto', {
          'h-[30rem] overflow-y-auto': isMaxLength
        })}
      >
        {hasMembers &&
          members?.map((item, index) => {
            const isOwner = item.isPrimary;
            const label = isOwner ? 'owner' : 'member';
            const mapStatus = {
              owner: {
                bg: 'bg-purple-primary',
                text: 'text-white'
              },
              member: {
                bg: 'bg-brownish',
                text: 'text-white'
              }
            };
            const style = mapStatus[label];
            return (
              <div
                key={item.email}
                className={cn('flex justify-between gap-4 py-6 border-b', {
                  'border-t': index === 0
                })}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {item.username}
                    </p>
                    <span
                      className={cn(
                        'px-2 h-[26px] w-[84px] rounded-[20px] text-xs flex justify-center items-center border capitalize',
                        style.bg,
                        style.text
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1">{item.email}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Date Created
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}

        {!hasMembers && (
          <p className="text-lg font-medium text-foreground flex justify-center items-center h-20">
            No members found
          </p>
        )}
      </div>

      <div className="mt-[6.19rem]s w-full flex justify-between bg-gray-light-3 py-5 px-6">
        <Button
          variant="outline"
          className="gap-[0.5rem] flex items-center h-8"
          type="button"
          onClick={handleClose}
        >
          <span>Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};
