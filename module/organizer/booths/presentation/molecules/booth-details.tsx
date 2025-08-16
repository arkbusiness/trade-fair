'use client';

import { LabelValueCard, Modal } from '@/app/core/shared/components/molecules';
import { cn } from '@/app/core/shared/utils';
import { Edit3, Upload } from 'lucide-react';
import { IBooth } from '../../hooks';
import Image from 'next/image';
import { formatDate } from '@/app/core/shared/lib';
import { Button } from '@/app/core/shared/components/atoms';

interface BoothDetailsProps {
  isOpen: boolean;
  handleClose: () => void;
  handleEdit: (booth: IBooth) => void;
  selectedBooth: IBooth | null;
}

export const BoothDetails = ({
  isOpen,
  handleClose,
  handleEdit,
  selectedBooth
}: BoothDetailsProps) => {
  const isAssigned = selectedBooth?.status?.toLowerCase() === 'assigned';
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Booth Details"
      description=""
      contentClassName="px-0 pb-0 overflow-hidden max-w-[37.25rem] sm:max-w-[46.62rem]"
      headerClassName="px-6"
    >
      <div className="flex flex-col px-6 py-7">
        <div className="flex items-center gap-2 justify-between mb-7">
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

          <button
            onClick={() => {
              if (!selectedBooth) return;
              handleEdit(selectedBooth);
            }}
            className="flex items-center gap-1 text-tertiary"
          >
            <Edit3 size={16} />
            <span className="text-xs font-medium">Edit</span>
          </button>
        </div>

        <div className="flex gap-5">
          <div className="max-w-[135px] w-full border border-foreground/10 rounded-[8px] px-2 pb-6 pt-3 flex flex-col gap-1 justify-center">
            <div className="flex-1 flex justify-center">
              <Image
                src="/images/qrcode.png"
                alt="QR"
                width={74}
                height={74}
                className="object-contain"
              />
            </div>
            <button className="flex gap-1 justify-center items-center mt-3">
              <Upload size={16} className="text-light-blue-2" />
              <span className="text-light-blue-2 text-sm font-medium">
                Download
              </span>
            </button>
          </div>

          {/* Basic Details */}
          <div className="flex flex-col gap-4 border border-foreground/10 flex-1 rounded-[8px] pb-6 overflow-hidden">
            <h3 className="text-foreground font-semibold h-[53px] flex items-center bg-gray-light-3 px-2">
              Basic Details
            </h3>
            <div className="px-2 flex flex-wrap justify-between gap-2 max-w-[400px]">
              <LabelValueCard
                label="Booth Number"
                value={selectedBooth?.number}
              />

              <LabelValueCard
                label="Booth Category"
                value={selectedBooth?.categoryName}
              />
            </div>
          </div>
        </div>

        {/* More Information */}
        <div className="flex flex-col gap-4 border border-foreground/10 flex-1 rounded-[8px] pb-6 overflow-hidden mt-6">
          <h3 className="text-foreground font-semibold h-[53px] flex items-center bg-gray-light-3 px-2">
            More Information
          </h3>
          <div className="px-2 flex flex-wrap justify-between gap-2 w-full max-w-[600px]">
            <LabelValueCard label="QR Code Usage" value="43 Attendees" />

            <LabelValueCard
              label="Assigned to"
              value={selectedBooth?.exhibitorName ?? 'Not assigned'}
            />

            <LabelValueCard
              label="Date Created"
              value={
                selectedBooth?.createdAt
                  ? formatDate(selectedBooth.createdAt)
                  : 'N/A'
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-[6.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
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
