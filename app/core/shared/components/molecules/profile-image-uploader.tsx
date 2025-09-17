'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '../../utils';
import Image from 'next/image';
import { ImagePlaceholder } from '../atoms/image-placeholder';

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
          user?.photoUrl || previewImage ? '' : 'bg-black/35'
        )}
      />

      {/* Camera icon */}
      {!disableUpload && (
        <>
          <svg
            width={44}
            height={44}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute"
          >
            <rect
              width={44}
              height={44}
              rx={22}
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M29 13H15C13.8954 13 13 13.8954 13 15V29C13 30.1046 13.8954 31 15 31H29C30.1046 31 31 30.1046 31 29V15C31 13.8954 30.1046 13 29 13Z"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 21C20.1046 21 21 20.1046 21 19C21 17.8954 20.1046 17 19 17C17.8954 17 17 17.8954 17 19C17 20.1046 17.8954 21 19 21Z"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31 25.0002L27.914 21.9142C27.5389 21.5392 27.0303 21.3286 26.5 21.3286C25.9697 21.3286 25.4611 21.5392 25.086 21.9142L16 31.0002"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

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
          {user?.photoUrl || avatarPlaceholder ? (
            <Image
              width={160}
              height={160}
              src={user?.photoUrl || avatarPlaceholder}
              alt={user?.name || 'User avatar'}
              className={cn(
                'w-full h-full mx-auto object-cover',
                imageClassName
              )}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </>
      )}
    </div>
  );
};
