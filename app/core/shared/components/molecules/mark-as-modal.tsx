'use client';

import { useForm } from 'react-hook-form';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { Textarea } from '@/app/core/shared/components/atoms';

interface MarkAsModalProps {
  type:
    | 'transfer'
    | 'declined'
    | 'shipped'
    | 'delivered'
    | 'approved'
    | 'received';
  isOpen: boolean;
  title: string;
  buttonLabel?: string;
  isLoading: boolean;
  showNote?: boolean;
  description: string;
  onClose(): void;
  handleSubmit(note: string): void;
}

export const MarkAsModal = ({
  type,
  isOpen,
  onClose,
  handleSubmit,
  title,
  buttonLabel,
  description,
  isLoading,
  showNote
}: MarkAsModalProps) => {
  const {
    register,
    handleSubmit: handleSubmitForm,
    reset
  } = useForm({
    defaultValues: {
      note: ''
    }
  });

  const onSubmit = ({ note }: { note: string }) => {
    handleSubmit(note);
  };

  const handleCloseModal = () => {
    if (isLoading) return;
    reset();
    onClose();
  };

  const buttonVariant = {
    transfer: 'tertiary',
    declined: 'tertiary',
    shipped: 'warning',
    delivered: 'success',
    approved: 'success',
    rejected: 'tertiary',
    completed: 'success',
    received: 'success'
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title={title}
      description={description}
      contentClassName="max-w-[25rem] sm:max-w-[30rem] w-full"
    >
      <form onSubmit={handleSubmitForm(onSubmit)}>
        {/* Note */}
        {showNote && (
          <div className="w-full">
            <Textarea
              label="Notes (Optional)"
              placeholder="Add any notes or comments..."
              rows={8}
              {...register('note')}
            />
          </div>
        )}

        <div className="mt-7">
          <LoadingButton
            className="w-full"
            type="submit"
            variant={buttonVariant[type as never]}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {buttonLabel || title}
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
