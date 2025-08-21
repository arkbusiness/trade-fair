'use client';
import { ReactNode, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/app/core/shared/components/atoms';
import { cn } from '../../utils';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  visuallyHiddenTitle?: boolean;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
  isModal?: boolean;
  contentClassName?: string;
  headerClassName?: string;
  loading?: boolean;
}

export const Modal = ({
  isOpen,
  title,
  description,
  children,
  contentClassName,
  headerClassName,
  isModal = true,
  visuallyHiddenTitle = false,
  onClose
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange} modal={isModal}>
      <DialogContent
        className={cn(
          'w-full max-w-[596px] sm:max-w-[596px]',
          contentClassName
        )}
      >
        <DialogHeader
          className={cn('justify-center py-3 border-b', headerClassName)}
        >
          {title && !visuallyHiddenTitle && (
            <DialogTitle className="text-[1.25rem] font-semibold text-foreground">
              {title}
            </DialogTitle>
          )}
          {title && visuallyHiddenTitle && (
            <DialogTitle
              className={cn({
                'sr-only "text-[1.25rem] font-semibold': visuallyHiddenTitle
              })}
            >
              {title}
            </DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-[0.88rem] font-medium">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div>{children && children}</div>
      </DialogContent>
    </Dialog>
  );
};
