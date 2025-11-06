'use client';

import { ErrorText, LinkButton } from '@/app/core/shared/components/atoms';
import {
  DocumentUploader,
  IconButton,
  LoadingButton,
  Modal
} from '@/app/core/shared/components/molecules';
import { yupResolver } from '@hookform/resolvers/yup';
import { CloudDownload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ACCEPT_DOCUMENT } from '../../../../../core/shared/hooks/use-file-uploader';
import toast from 'react-hot-toast';
import { errorHandler } from '../../../../../core/shared/utils';
import { useImportBooths } from '../../api';

const validationSchema = yup.object().shape({
  file: yup.mixed<File[]>().required('File is required')
});

type ImportFormValues = yup.InferType<typeof validationSchema>;

interface ImportFormProps {
  onSuccess: () => void;

  sampleFileUrl: string;
}

export const ImportBoothForm = ({
  onSuccess,
  sampleFileUrl
}: ImportFormProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { importBooths, isPending } = useImportBooths({
    onSuccess: () => {
      toast.success('File imported successfully');
      handleCloseModal();
      onSuccess();
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });
  const {
    setValue,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<ImportFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      file: undefined
    }
  });

  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };

  const onSubmit = (values: ImportFormValues) => {
    importBooths({ file: values.file[0] });
  };

  const { file: fileError } = errors;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <IconButton variant="outline" onClick={handleOpenModal}>
        <CloudDownload size={16} />
        <span>Import</span>
      </IconButton>

      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        title="Import file"
        description="Upload your file"
        contentClassName="px-0 pb-0 overflow-hidden"
        headerClassName="px-6"
      >
        <div className="py-4 flex flex-col gap-y-[1rem] px-4">
          <p>
            Please upload a valid file in CSV, Excel (.xlsx or .xls) format. You
            can also download the sample file to edit and reupload for easy
            import.
          </p>
          <LinkButton
            variant="highlight"
            href={sampleFileUrl}
            target="_blank"
            download
          >
            Download sample file
          </LinkButton>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4">
          <fieldset
            className="flex flex-col gap-[1.86rem] w-full text-left relative"
            disabled={isPending}
          >
            {/* Document */}
            <div className="full flex flex-col gap-[0.5rem]">
              <span className="text-[0.75rem] font-medium">File</span>
              <DocumentUploader
                maxFiles={1}
                maxSize={5}
                accept={{
                  [ACCEPT_DOCUMENT.xlsx[0] as string]: ACCEPT_DOCUMENT
                    .xlsx[1] as string[],
                  [ACCEPT_DOCUMENT.excel[0] as string]: ACCEPT_DOCUMENT
                    .excel[1] as string[],
                  [ACCEPT_DOCUMENT.csv[0] as string]: ACCEPT_DOCUMENT
                    .csv[1] as string[]
                }}
                onValueChange={(value) => {
                  setValue(`file`, value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true
                  });
                }}
              />
              <ErrorText message={fileError?.message} />
            </div>

            <LoadingButton
              variant="tertiary"
              type="submit"
              isLoading={isPending}
              className="w-full"
            >
              Submit
            </LoadingButton>
          </fieldset>
        </form>
      </Modal>
    </div>
  );
};
