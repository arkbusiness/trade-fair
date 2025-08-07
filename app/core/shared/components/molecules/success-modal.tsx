import { ReactNode } from 'react';
import { Modal } from './modal';
import Image from 'next/image';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  image: string;
  description: string | ReactNode;
  onClose(): void;
}

export const SuccessModal = ({
  isOpen,
  title,
  image,
  description,
  onClose
}: SuccessModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Success Modal"
      visuallyHiddenTitle={true}
      description=""
    >
      <div className="flex flex-col gjustify-center w-full items-center gap-[2.94rem]">
        <h1 className="text-[1.25rem] font-bold">{title}</h1>
        <div className="w-full flex flex-col items-center m-h-[101px] justify-center">
          <Image
            src="/images/ribbon.svg"
            alt="ribbon"
            width={329}
            height={201}
          />
          <Image
            src={image}
            alt={title}
            width={84}
            height={70}
            className="object-contain absolute"
          />
        </div>
        <div className="text-[0.88rem] font-medium text-foreground/80">
          {description}
        </div>
      </div>
    </Modal>
  );
};
