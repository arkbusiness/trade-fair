'use client';

import {
  ACCEPT_DOCUMENT,
  useFileUploader
} from '../../hooks/use-file-uploader';
import { FileUploader } from '../atoms';

interface IDocumentUploader {
  onValueChange(value: File[]): void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
}

export const DocumentUploader = ({
  onValueChange,
  maxFiles = 1,
  maxSize = 5,
  accept = {
    [ACCEPT_DOCUMENT.pdf[0] as string]: ACCEPT_DOCUMENT.pdf[1] as string[]
  }
}: IDocumentUploader) => {
  const { files, getInputProps, getRootProps, isDragActive, onRemove } =
    useFileUploader({
      type: 'document',
      accept: accept,
      maxFiles: maxFiles,
      maxSize: maxSize * 1024 * 1024,
      onValueChange(value) {
        onValueChange(value);
      }
    });

  return (
    <div className="w-full">
      <FileUploader
        maxFiles={maxFiles}
        showPreview={true}
        type="document"
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        files={files}
        isDragActive={isDragActive}
        removeFile={onRemove}
        maxSize={maxSize}
      />
    </div>
  );
};
