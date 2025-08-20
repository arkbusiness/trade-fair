'use client';

import { cn } from '../../utils';

interface ImagePlaceholderProps {
  className?: string;
  label?: string;
}

export const ImagePlaceholder = ({
  className,
  label
}: ImagePlaceholderProps) => {
  return (
    <div
      className={cn(
        'w-[100px] h-[100px] overflow-hidden rounded-[12px] flex items-center justify-center bg-gray-200 text-lg',
        className
      )}
    >
      <p className="text-gray-600">{label}</p>
    </div>
  );
};
