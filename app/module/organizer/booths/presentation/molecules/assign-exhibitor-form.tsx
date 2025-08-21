'use client';
import { Button, ErrorText } from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { useCustomMutation } from '@/app/core/shared/hooks/use-mutate';
import { errorHandler } from '@/app/core/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { IBooth } from '../../hooks';
import { boothsService } from '../../services';
import { ExhibitorsSelect } from '../../../exhibitors/presentation/organisms';

interface AssignExhibitorFormProps {
  isOpen: boolean;
  selectedBooth: IBooth | null;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  exhibitorId: yup
    .mixed<{
      id: string;
      name: string;
    }>()
    .required('Exhibitor is required')
});

type AssignExhibitorFormType = yup.InferType<typeof validationSchema>;

export const AssignExhibitorForm = ({
  isOpen,
  selectedBooth,
  onClose
}: AssignExhibitorFormProps) => {
  const mutation = useCustomMutation();

  const form = useForm<AssignExhibitorFormType>({
    resolver: yupResolver(validationSchema),
    values: {
      exhibitorId: null as never
    },
    mode: 'onChange'
  });

  const {
    handleSubmit,
    formState: { errors },
    reset
  } = form;

  const handleCloseModal = () => {
    if (mutation.isPending) return;
    reset();
    onClose();
  };

  const handleAssignExhibitor = (data: AssignExhibitorFormType) => {
    if (!selectedBooth?.id) return;
    const formValues = {
      ...data,
      exhibitorId: data.exhibitorId?.id as string
    };
    mutation.mutate(
      boothsService.assignExhibitor(selectedBooth?.id, formValues),
      {
        onError(error) {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        },
        onSuccess() {
          toast.success('Exhibitor assigned successfully.');
          handleCloseModal();
        }
      }
    );
  };

  const onSubmit = (data: AssignExhibitorFormType) => {
    handleAssignExhibitor(data);
  };

  const { exhibitorId: exhibitorIdError } = errors;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Assign an Exhibitor"
      description="Quickly send an invite to an exhibitor to claim this Booth."
      contentClassName="px-0 pb-0 overflow-hidden max-h-[400px] h-full"
      headerClassName="px-6"
    >
      <form
        className="flex flex-col flex-1 h-full gap-[1.86rem] w-full text-left relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className="w-full px-4 h-[150px]"
          disabled={mutation.isPending}
        >
          <div>
            <ExhibitorsSelect
              form={form}
              name="exhibitorId"
              exhibitorsError={exhibitorIdError?.message}
              onSelectChange={(value) => {
                form.setValue('exhibitorId', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }}
            />
            <ErrorText message={exhibitorIdError?.message} />
          </div>
        </fieldset>
        <div className="mt-5 w-full flex justify-between bg-gray-light-3 py-5 px-6 flex-1 items-center">
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
            <span>Send Invite</span>
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};
