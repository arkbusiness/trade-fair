'use client';

import { LoadingButton } from './loading-button';
import { Modal } from './modal';

interface IConfirmationModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  isModal?: boolean;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  isModal = true,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Continue',
  cancelText = 'Cancel'
}: IConfirmationModal) => {
  return (
    <Modal
      isOpen={isOpen}
      isModal={isModal}
      title={title}
      description={description}
      contentClassName="px-0 pb-6 overflow-hidden z-50"
      headerClassName="px-6"
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6 px-6">
        <LoadingButton
          disabled={isLoading}
          variant="tertiary"
          onClick={onClose}
        >
          {cancelText}
        </LoadingButton>
        <LoadingButton
          isLoading={isLoading}
          disabled={isLoading}
          variant="outline"
          onClick={onConfirm}
        >
          {confirmText}
        </LoadingButton>
      </div>
    </Modal>
  );
};
