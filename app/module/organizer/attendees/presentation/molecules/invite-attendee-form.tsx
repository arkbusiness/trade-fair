'use client';
import { Button, ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { organizerAttendeesService } from '../../services';

interface InviteAttendeeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email')
});

type InviteAttendeeFormType = yup.InferType<typeof validationSchema>;

export const InviteAttendeeForm = ({
  isOpen,
  onClose
}: InviteAttendeeFormProps) => {
  const mutation = useCustomMutation();

  const form = useForm<InviteAttendeeFormType>({
    resolver: yupResolver(validationSchema),
    values: {
      email: ''
    },
    mode: 'onChange'
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = form;

  const handleCloseModal = () => {
    if (mutation.isPending) return;
    reset();
    onClose();
  };

  const onSubmit = (data: InviteAttendeeFormType) => {
    mutation.mutate(organizerAttendeesService.inviteAttendee(data), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Invite sent.');
        handleCloseModal();
      }
    });
  };

  const { email: emailError } = errors;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Invite Attendee"
      description="Invite attendee to the event"
      contentClassName="px-0 pb-0 overflow-hidden"
      headerClassName="px-6"
    >
      <form
        className="flex flex-col gap-[1.86rem] w-full text-left relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="w-full px-4" disabled={mutation.isPending}>
          {/* Email */}
          <div>
            <Input
              label="Email"
              placeholder="e.g. example@example.com"
              hasError={!!emailError?.message?.length}
              {...register('email')}
            />
            <ErrorText message={emailError?.message} />
          </div>
        </fieldset>
        <div className="mt-[3.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
          <Button
            variant="outline"
            className="gap-[0.5rem] flex items-center h-8"
            type="button"
            onClick={handleCloseModal}
            disabled={mutation.isPending}
          >
            <span>Cancel</span>
          </Button>

          <LoadingButton
            variant="tertiary"
            className="gap-[0.5rem] flex items-center h-8"
            type="submit"
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Send Invite
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
