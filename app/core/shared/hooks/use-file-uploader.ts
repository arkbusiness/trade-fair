import { useCallback, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import toast from 'react-hot-toast';
import { useControllableState } from './use-controllable-state';
import { hasPreview } from '../utils';

interface UseFileUploaderProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  type?: 'image' | 'document'; // Determines preview behavior
  value?: File[];
  onValueChange?: (files: File[]) => void;
}

interface UseFileUploaderReturn {
  files: File[] | undefined;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  getRootProps: any;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  getInputProps: any;
  isDragActive: boolean;
  isDisabled: boolean;
  maxFiles: number;
  maxSize: number;
  open: () => void;
  onRemove: (index: number) => void;
}

export const ACCEPT_IMAGE = {
  png: ['image/png', ['.png']],
  jpg: ['image/jpeg', ['.jpg']],
  jpeg: ['image/jpeg', ['.jpeg']],
  all: ['image/*', []]
};

export const ACCEPT_DOCUMENT = {
  pdf: ['application/pdf', ['.pdf']],
  doc: ['application/msword', ['.doc']],
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ['.docx']
  ],
  csv: ['text/csv', ['.csv']],
  excel: ['application/vnd.ms-excel', ['.xls']],
  xlsx: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ['.xlsx']
  ],
  all: ['application/*', []]
};

export const useFileUploader = ({
  value,
  onValueChange,
  type = 'document',
  accept = type === 'image'
    ? { [ACCEPT_IMAGE.all[0] as string]: ACCEPT_IMAGE.all[1] as string[] }
    : {
        [ACCEPT_DOCUMENT.all[0] as string]: ACCEPT_DOCUMENT.all[1] as string[]
      },
  maxSize = 1024 * 1024 * 2, // 2 MB
  maxFiles = 1,
  multiple = false,
  disabled = false
}: UseFileUploaderProps): UseFileUploaderReturn => {
  const [files, setFiles] = useControllableState({
    prop: value,
    onChange: onValueChange
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const isSingleFileLimitExceeded =
        !multiple && maxFiles === 1 && acceptedFiles.length > 1;
      const isMultipleFileLimitExceeded =
        (files?.length ?? 0) + acceptedFiles.length > maxFiles;

      if (isSingleFileLimitExceeded) {
        toast.error('Cannot upload more than 1 file at a time');
        return;
      }

      if (isMultipleFileLimitExceeded) {
        toast.error(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      const newFiles = acceptedFiles.map((file) => {
        if (type === 'image') {
          // For images, assign preview URL
          return Object.assign(file, {
            preview: URL.createObjectURL(file)
          });
        }
        // For documents, don't assign preview, just use the file name
        return file;
      });

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`);
        });
      }
    },
    [files, maxFiles, multiple, setFiles, type]
  );

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1 || multiple,
    disabled: isDisabled
  });

  const onRemove = useCallback(
    (index: number) => {
      if (!files) return;
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onValueChange?.(newFiles);
    },
    [files, setFiles, onValueChange]
  );

  // Cleanup previews for images only
  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (type === 'image' && hasPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files, type]);

  return {
    files,
    isDisabled,
    maxFiles,
    maxSize,
    open,
    getRootProps,
    getInputProps,
    isDragActive,
    onRemove
  };
};
