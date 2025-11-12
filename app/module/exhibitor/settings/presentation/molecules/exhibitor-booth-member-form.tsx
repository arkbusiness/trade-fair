'use client';

import { ErrorText, Input } from '@/app/core/shared/components/atoms';
import { Button } from '@/app/core/shared/components/atoms/button';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useAddBoothMember } from '../../api';

interface ExhibitorBoothMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required')
});

type ExhibitorBoothMemberFormValues = yup.InferType<typeof validationSchema>;

export const ExhibitorBoothMemberForm = ({
  isOpen,
  onClose
}: ExhibitorBoothMemberFormProps) => {
  const { addBoothMember, isPending } = useAddBoothMember({
    onSuccess: () => {
      toast.success('Booth member added successfully');
      form.reset();
      onClose();
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });
  const form = useForm<ExhibitorBoothMemberFormValues>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { errors }
  } = form;

  const handleCloseModal = () => {
    if (isPending) return;
    form.reset();
    onClose();
  };

  const onSubmit = (values: ExhibitorBoothMemberFormValues) => {
    addBoothMember({
      email: values.email
    });
  };

  const { email: emailError } = errors ?? {};

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Add Booth Member"
      description=""
      contentClassName="px-0 pb-0"
      headerClassName="px-6 border-none"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        autoComplete="off"
      >
        {/* To focus on the first input */}
        <input type="text" className="absolute top-0 left-0 w-0 h-0" />

        <div className="flex flex-col gap-x-[1.86rem] gap-y-3 w-full text-left px-6 mt-3 overflow-y-auto h-[150px] py-4">
          {/* Email */}
          <div>
            <Input
              label="Email"
              placeholder="e.g. example@example.com"
              hasError={!!emailError?.message?.length}
              disabled={isPending}
              {...form.register('email')}
            />
            <ErrorText message={emailError?.message} />
          </div>
        </div>

        <div className="mt-[0.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
          <Button
            variant="outline"
            className="gap-[0.5rem] flex items-center h-8"
            type="button"
            onClick={handleCloseModal}
            disabled={isPending}
          >
            <span>Cancel</span>
          </Button>

          <LoadingButton
            variant="tertiary"
            className="gap-[0.5rem] flex items-center h-8"
            type="submit"
            isLoading={isPending}
            disabled={isPending}
          >
            <span>Save changes</span>
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
