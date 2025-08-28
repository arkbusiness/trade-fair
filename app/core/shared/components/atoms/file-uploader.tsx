'use client';

import { Button, Progress } from '@/app/core/shared/components/atoms';
import { cn, formatBytes, hasPreview } from '@/app/core/shared/utils';
import { Trash, TrashIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

interface FileUploaderProps {
  files: File[] | undefined;
  type: 'image' | 'document';
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  maxFiles?: number;
  maxSize: number;
  showPreview?: boolean;
  className?: string;
  progresses?: Record<string, number>;
  removeFile: (key: string) => void;
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

export function ImageCard({ file, onRemove }: FileCardProps) {
  return (
    <div className="relative flex justify-between items-center border border-input rounded-[8px] py-2 px-3">
      <div className="flex flex-1 items-center gap-2">
        {hasPreview(file) ? (
          <Image
            src={file.preview}
            alt={file.name}
            width={50}
            height={50}
            loading="lazy"
            className="aspect-square shrink-0 rounded-[4px] object-contain"
          />
        ) : null}
        <div className="flex flex-col gap-1 max-w-[168px] w-full">
          <p className="text-sm  font-medium text-foreground truncate">
            {file.name}
          </p>
          <p className="text-xs font-normal">{formatBytes(file.size)}</p>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="text-tertiary"
          aria-label="Remove file"
          onClick={onRemove}
        >
          <Trash className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </button>
      </div>
    </div>
  );
}

function DocumentCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex flex-1 flex-col gap-3">
        <span className="text-xs">{file?.name}</span>
        {progress ? (
          <Progress
            value={progress}
            primaryColor="bg-green-100"
            secondaryColor="bg-green-600"
          />
        ) : null}
      </div>

      <Button
        type="button"
        variant="destructive"
        aria-label="Remove item"
        className="w-5 h-7 flex items-center justify-center"
        onClick={onRemove}
      >
        <TrashIcon className="size-3" />
        <span className="sr-only">Remove file</span>
      </Button>
    </div>
  );
}

export function FileUploader({
  files,
  type,
  getRootProps,
  getInputProps,
  isDragActive,
  removeFile,
  maxFiles = 1,
  maxSize,
  progresses,
  className,
  showPreview = true,
  isDisabled = false,
  placeholder = 'Drag & drop files here, or click to select files'
}: FileUploaderProps) {
  return (
    <div className="relative flex flex-col gap-6 overflow-hidden w-full">
      <div
        {...getRootProps()}
        className={cn(
          'group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-1 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/15 bg-light-gray-2',
          'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isDragActive && 'border-muted-foreground/50',
          isDisabled ? 'pointer-events-none opacity-60' : '',
          className
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
            <div className="rounded-full border border-dashed p-3">
              <UploadIcon className="size-7" aria-hidden="true" />
            </div>
            <p className="font-medium">Drop the files here</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
            <div className="space-y-3">
              <p className="font-normal text-sm">
                <span>
                  <span className="text-tertiary inline-block mr-1 font-medium">
                    Click to upload
                  </span>
                  or drag and drop
                </span>

                <span className="inline-block w-full">{placeholder}</span>
              </p>
              <p className="text-sm text-muted-foreground italic">
                You can upload
                {maxFiles > 1
                  ? ` ${maxFiles === Infinity ? 'multiple' : maxFiles} files (up to ${formatBytes(maxSize)} each)`
                  : ` a file with ${formatBytes(maxSize)}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {showPreview && files?.length && type === 'image' ? (
        <div className="flex gap-4 flex-col">
          {files.map((file, index) => (
            <ImageCard
              key={index}
              file={file}
              onRemove={() => {
                const key = file.name + file.lastModified;
                removeFile(key);
              }}
              progress={progresses?.[file.name]}
            />
          ))}
        </div>
      ) : null}

      {showPreview && files?.length && type === 'document' ? (
        <div className="flex gap-4 flex-wrap w-full">
          {files.map((file, index) => (
            <DocumentCard
              key={index}
              file={file}
              onRemove={() => {
                const key = file.name + file.lastModified;
                removeFile(key);
              }}
              progress={progresses?.[file.name]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
