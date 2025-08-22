'use client';

import React, { useRef, useState } from 'react';

import toast from 'react-hot-toast';
import { cn } from '../../utils';
import { Button } from '../atoms';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';

interface CoverImageUploaderProps {
  onImageUpload?: (file: File) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  className?: string;
  imageUrl?: string;
}

export const CoverImageUploader: React.FC<CoverImageUploaderProps> = ({
  onImageUpload,
  maxSizeMB = 6,
  acceptedFormats = ['image/jpeg', 'image/png'],
  className = '',
  imageUrl
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        toast.error(`File size exceeds ${maxSizeMB}MB limit`);
        return;
      }

      // Check file type
      if (!acceptedFormats.includes(file.type)) {
        toast.error(
          `File type not supported. Please upload ${acceptedFormats.map((format) => format.split('/')[1].toUpperCase()).join(', ')}`
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setPreviewImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);

      // Call the callback function with the file
      if (onImageUpload) {
        onImageUpload(file);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const hasImage = imageUrl || previewImage;

  return (
    <div
      className={cn(
        'h-full w-full relative flex items-center justify-center overflow-hidden rounded-[8px] border-1 border-dashed border-muted-foreground/25 cursor-pointer px-3',
        className
      )}
      onClick={() => {
        if (!hasImage) {
          handleImageClick();
        }
      }}
    >
      {!hasImage && (
        <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
          <div className="rounded-full border border-dashed p-3">
            <UploadIcon className="size-7" aria-hidden="true" />
          </div>
          <div className="space-y-3 max-auto text-center">
            <p className="font-normal text-xs md:text-sm">
              <span className="text-tertiary inline-block mr-1">
                Click to upload
              </span>
              <span>or drag and drop(PNG, JPG)</span>
            </p>
            <p className="text-sm text-muted-foreground italic">
              You can upload a file with {maxSizeMB}MB
            </p>
          </div>
        </div>
      )}

      {hasImage && (
        <div className="flex items-center justify-center absolute left-0 top-0 w-full h-full">
          <Button
            type="button"
            variant="default"
            className="bg-amber-50 hover:bg-amber-50 text-foreground rounded-md h-10 w-[90px]"
            onClick={handleImageClick}
          >
            Change
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFormats.join(',')}
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
      />

      {previewImage ? (
        <Image
          width={1200}
          height={400}
          src={previewImage}
          className="w-full h-full mx-auto object-cover"
          alt="Image preview"
        />
      ) : (
        <>
          {imageUrl ? (
            <Image
              width={1200}
              height={400}
              src={imageUrl || '/images/avatar.png'}
              alt="Image preview"
              className="w-full h-full mx-auto object-cover"
            />
          ) : null}
        </>
      )}
    </div>
  );
};
