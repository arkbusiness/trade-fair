'use client';

import { TrashIcon, UploadIcon } from 'lucide-react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { cn, hasPreview } from '@/app/core/shared/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button, Progress } from '@/app/core/shared/components/atoms';

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
  removeFile: (index: number) => void;
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

function ImageCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <div className="relative">
      <div className="flex flex-1 flex-col gap-3">
        {hasPreview(file) ? (
          <Image
            src={file.preview}
            alt={file.name}
            width={58}
            height={58}
            loading="lazy"
            className="aspect-square shrink-0 rounded-md object-cover"
          />
        ) : null}
        <div className="flex w-full flex-col gap-2">
          {progress ? (
            <Progress value={progress} className="bg-muted/35 h-[10px]" />
          ) : null}
        </div>
      </div>
      <div className="absolute right-[-2px] top-[-5px]">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-5 bg-danger hover:bg-danger/80 rounded-full text-white"
          onClick={onRemove}
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
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
          'group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-1 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/15',
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
            <div className="rounded-full border border-dashed p-3">
              <UploadIcon className="size-7" aria-hidden="true" />
            </div>
            <div className="space-y-3">
              <p className="font-medium text-muted-foreground text-sm">
                {placeholder}
              </p>
              <p className="text-sm text-muted-foreground italic">
                You can upload
                {maxFiles > 1
                  ? ` ${maxFiles === Infinity ? 'multiple' : maxFiles} files (up to ${maxSize}MB each)`
                  : ` a file with ${maxSize}MB`}
              </p>
            </div>
          </div>
        )}
      </div>

      {showPreview && files?.length && type === 'image' ? (
        <div className="flex gap-4 flex-wrap">
          {files.map((file, index) => (
            <ImageCard
              key={index}
              file={file}
              onRemove={() => removeFile(index)}
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
              onRemove={() => removeFile(index)}
              progress={progresses?.[file.name]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
