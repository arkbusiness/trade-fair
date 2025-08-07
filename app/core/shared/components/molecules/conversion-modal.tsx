'use client';

import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';

interface ConversionModalProps {
  type: 'bill' | 'invoice';
  isOpen: boolean;
  onClose(): void;
  handleConvert(): void;
  isLoading: boolean;
  reference: string;
  note: string;
}

export const ConversionModal = ({
  type,
  reference,
  note,
  isOpen,
  onClose,
  isLoading = false,
  handleConvert
}: ConversionModalProps) => {
  const title = type === 'bill' ? 'Bill' : 'Invoice';

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      visuallyHiddenTitle={true}
      title={title}
      description=""
      contentClassName="max-w-[25rem] sm:max-w-[30rem] w-full"
    >
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-col gap-y-2 bg-notes/14 rounded-[0.50rem] py-2 px-4">
          <h3 className="font-medium text-sm">Notes</h3>
          <p className="text-sm font-normal">Note: {note}</p>
        </div>

        <div>
          <h4 className="font-bold text-xl">Convert to {title}</h4>
          <p className="text-sm font-normal text-foreground/70">
            You are about to convert this sales order{' '}
            <span className="font-semibold">{reference}</span> to an Invoice.
            This action can not be reversed.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <LoadingButton
          className="w-full"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={handleConvert}
        >
          Convert to {title}
        </LoadingButton>
      </div>
    </Modal>
  );
};
