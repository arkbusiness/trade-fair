'use client';
import { Button, ErrorText, Input } from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { CategorySelect } from '@/app/core/shared/components/organisms';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { IBooth } from '../../hooks';
import { boothsService } from '../../services';

interface BoothFormProps {
  isOpen: boolean;
  selectedBooth: IBooth | null;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  number: yup.string().required('Booth number is required'),
  categoryId: yup
    .mixed<{
      id: string;
      name: string;
    }>()
    .required('Category is required')
    .nullable()
});

type BoothFormType = yup.InferType<typeof validationSchema>;

export const BoothForm = ({
  isOpen,
  selectedBooth,
  onClose
}: BoothFormProps) => {
  const mutation = useCustomMutation();

  const form = useForm<BoothFormType>({
    resolver: yupResolver(validationSchema),
    values: {
      number: selectedBooth?.number || '',
      categoryId: selectedBooth
        ? {
            id: selectedBooth?.categoryId,
            name: selectedBooth?.categoryName
          }
        : null
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

  const handleCreateBooth = (data: BoothFormType) => {
    const formValues = {
      ...data,
      categoryId: data.categoryId?.id as string
    };
    mutation.mutate(boothsService.createBooth(formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Booth created successfully.');
        handleCloseModal();
      }
    });
  };

  const handleUpdateBooth = (data: BoothFormType) => {
    if (!selectedBooth?.id) return;
    const formValues = {
      ...data,
      categoryId: data.categoryId?.id as string
    };
    mutation.mutate(boothsService.updateBooth(selectedBooth?.id, formValues), {
      onError(error) {
        const errorMessage = errorHandler(error);
        toast.error(errorMessage);
      },
      onSuccess() {
        toast.success('Booth created successfully.');
        handleCloseModal();
      }
    });
  };

  const onSubmit = (data: BoothFormType) => {
    if (selectedBooth) {
      handleUpdateBooth(data);
    } else {
      handleCreateBooth(data);
    }
  };

  const { number: boothNumberError, categoryId: categoryError } = errors;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title={selectedBooth ? 'Edit Booth' : 'Add Booth'}
      description={selectedBooth ? 'Edit booth details' : 'Create a new booth'}
      contentClassName="px-0 pb-0 overflow-hidden"
      headerClassName="px-6"
      closeClassName="text-tertiary"
    >
      <form
        className="flex flex-col gap-[1.86rem] w-full text-left relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="w-full px-4" disabled={mutation.isPending}>
          <div className="grid lg:grid-cols-2 gap-[1.86rem]">
            {/* Company Name */}
            <div>
              <Input
                label="Booth Number"
                placeholder="e.g. B0003"
                hasError={!!boothNumberError?.message?.length}
                {...register('number')}
              />
              <ErrorText message={boothNumberError?.message} />
            </div>

            {/* Category */}
            <div className="w-full">
              <CategorySelect
                form={form}
                name="categoryId"
                categoryError={categoryError?.message}
                onSelectChange={(value) => {
                  form.setValue('categoryId', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
              />
              <ErrorText message={categoryError?.message} />
            </div>
          </div>
        </fieldset>
        <div className="mt-[10.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
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
            <span>{selectedBooth ? 'Update' : 'Add'}</span>
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
