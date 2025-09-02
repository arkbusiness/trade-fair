'use client';

import { Button, ErrorText, Input } from '@/app/core/shared/components/atoms';
import {
  LoadingButton,
  Modal,
  PasswordInput
} from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { exhibitorSettingsService } from '../../services';

interface ExhibitorBoothMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm your password.')
});

type ExhibitorBoothMemberFormValues = yup.InferType<typeof validationSchema>;

export const ExhibitorBoothMemberForm = ({
  isOpen,
  onClose
}: ExhibitorBoothMemberFormProps) => {
  const mutation = useCustomMutation();
  const form = useForm<ExhibitorBoothMemberFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { errors }
  } = form;

  const handleCloseModal = () => {
    if (mutation.isPending) return;
    form.reset();
    onClose();
  };

  const onSubmit = (values: ExhibitorBoothMemberFormValues) => {
    const formValues = {
      email: values.email,
      password: values.password
    };
    mutation.mutate(exhibitorSettingsService.addBoothMember(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Booth member added successfully');
        form.reset();
        handleCloseModal();
      }
    });
  };

  const {
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError
  } = errors ?? {};

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

        <div className="flex flex-col gap-x-[1.86rem] gap-y-3 w-full text-left px-6 mt-3 overflow-y-auto h-[400px] py-4">
          {/* Email */}
          <div>
            <Input
              label="Email"
              hasError={!!emailError?.message?.length}
              disabled={mutation.isPending}
              {...form.register('email')}
            />
            <ErrorText message={emailError?.message} />
          </div>

          {/* Password */}
          <div>
            <PasswordInput
              label="Password"
              hasError={!!passwordError?.message?.length}
              disabled={mutation.isPending}
              {...form.register('password')}
            />
            <ErrorText message={passwordError?.message} />
          </div>

          {/* Confirm Password */}
          <div>
            <PasswordInput
              label="Confirm Password"
              hasError={!!confirmPasswordError?.message?.length}
              disabled={mutation.isPending}
              {...form.register('confirmPassword')}
            />
            <ErrorText message={confirmPasswordError?.message} />
          </div>
        </div>

        <div className="mt-[0.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
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
            <span>Save changes</span>
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
