'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '../../utils';
import Image from 'next/image';
import { ImagePlaceholder } from '../atoms/image-placeholder';
import { CameraIcon } from '../atoms';

interface ProfileImageUploaderProps {
  onImageUpload?: (file: File) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  className?: string;
  avatarPlaceholder?: string;
  imageClassName?: string;
  disableUpload?: boolean;
  user?: {
    photoUrl?: string;
    name?: string;
  };
}

export const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  onImageUpload,
  maxSizeMB = 15,
  acceptedFormats = ['image/jpeg', 'image/png'],
  className = '',
  avatarPlaceholder = '/images/avatar.png',
  imageClassName = '',
  disableUpload = false,
  user
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

  const handleImagePreviewClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        'mx-auto w-[clamp(100px,_30vw,_160px)] h-[clamp(100px,_30vw,_160px)] border-[2px] border-white relative flex items-center justify-center cursor-pointer overflow-hidden rounded-full',
        className
      )}
      onClick={handleImagePreviewClick}
    >
      <div
        className={cn(
          'absolute left-0 top-0 w-full h-full',
          user?.photoUrl || previewImage ? '' : 'bg-black/15'
        )}
      />

      {/* Camera icon */}
      {!disableUpload && (
        <>
          <CameraIcon />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedFormats.join(',')}
            onChange={handleFileChange}
            onClick={(e) => e.stopPropagation()}
          />
        </>
      )}

      {previewImage ? (
        <Image
          width={160}
          height={160}
          src={previewImage}
          className={cn('w-full h-full mx-auto object-cover', imageClassName)}
          alt="Image preview"
        />
      ) : (
        <>
          {user?.photoUrl && (
            <Image
              width={160}
              height={160}
              src={user?.photoUrl}
              alt={user?.name || 'User avatar'}
              className={cn(
                'w-full h-full mx-auto object-cover',
                imageClassName
              )}
            />
          )}

          {!user?.photoUrl && avatarPlaceholder && (
            <Image
              width={160}
              height={160}
              src={avatarPlaceholder}
              alt={user?.name || 'User avatar'}
              className={cn(
                'w-full h-full mx-auto object-cover',
                imageClassName
              )}
            />
          )}

          {!user?.photoUrl && !avatarPlaceholder && <ImagePlaceholder />}
        </>
      )}
    </div>
  );
};
