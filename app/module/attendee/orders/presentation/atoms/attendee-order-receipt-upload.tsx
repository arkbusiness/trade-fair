'use client';

import { ErrorText, FileUploader } from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useFileUploader } from '../../../../../core/shared/hooks/use-file-uploader';
import { useCustomMutation } from '../../../../../core/shared/hooks/use-mutate';
import { errorHandler } from '../../../../../core/shared/utils';

const validationSchema = yup.object().shape({
  file: yup.mixed<File[]>().required('File is required')
});

type FormValues = yup.InferType<typeof validationSchema>;

interface AttendeeOrderReceiptUploadForm {
  isOpen: boolean;
  orderId: string;
  onClose(): void;
}

export const AttendeeOrderReceiptUploadForm = ({
  orderId,
  isOpen,
  onClose
}: AttendeeOrderReceiptUploadForm) => {
  const mutation = useCustomMutation();

  const {
    setValue,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      file: undefined
    }
  });

  const {
    files,
    getInputProps,
    getRootProps,
    isDragActive,
    maxSize,
    onRemove
  } = useFileUploader({
    type: 'image',
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
    onValueChange(value) {
      setValue('file', value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  });

  const handleCloseModal = () => {
    if (mutation.isPending) return;
    reset();
    onClose();
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append('file', values.file[0]);

    mutation.mutate(
      {
        url: `/attendee/order/${orderId}/payment-slip`,
        method: 'PUT',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
      {
        onSuccess: () => {
          toast.success('Receipt uploaded successfully');
          handleCloseModal();
        },
        onError: (error) => {
          const errorMessage = errorHandler(error);
          toast.error(errorMessage);
        }
      }
    );
  };

  const { file: fileError } = errors;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Upload Receipt"
        description=""
        contentClassName="px-0 pb-0 overflow-hidden"
        headerClassName="px-6"
      >
        <div className="py-4 flex flex-col gap-y-[1rem] px-4">
          <p>
            Upload your payment receipt for this order. Accepted formats: JPG,
            PNG
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4">
          <fieldset
            className="flex flex-col gap-[1.86rem] w-full text-left relative"
            disabled={mutation.isPending}
          >
            <div className="full flex flex-col gap-[0.5rem]">
              <FileUploader
                maxFiles={1}
                showPreview={true}
                placeholder="PNG, JPEG, JPG"
                isDisabled={mutation.isPending}
                type="image"
                getInputProps={getInputProps}
                getRootProps={getRootProps}
                files={files}
                isDragActive={isDragActive}
                removeFile={(key) => onRemove(key)}
                maxSize={maxSize}
              />
              <ErrorText message={fileError?.message} />
            </div>

            <LoadingButton
              variant="tertiary"
              type="submit"
              isLoading={mutation.isPending}
              className="w-full"
            >
              Submit
            </LoadingButton>
          </fieldset>
        </form>
      </Modal>
    </>
  );
};
