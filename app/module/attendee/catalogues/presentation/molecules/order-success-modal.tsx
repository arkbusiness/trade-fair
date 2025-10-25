import { Modal } from '@/app/core/shared/components/molecules';
import { Button } from '@/app/core/shared/components/atoms';
import Image from 'next/image';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessModal = ({
  isOpen,
  onClose,
  onViewOrders
}: OrderSuccessModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order Success"
      visuallyHiddenTitle={true}
      description=""
    >
      <div className="flex flex-col justify-center w-full items-center gap-[2.94rem] p-10">
        <h1 className="text-[1.25rem] font-bold text-center">
          Your order has been placed successfully! 🎉
        </h1>

        <div className="w-full flex flex-col items-center min-h-[101px] justify-center relative">
          <Image
            src="/images/ribbon.svg"
            alt="ribbon"
            width={329}
            height={201}
          />
          <Image
            src="/images/cone.svg"
            alt="success"
            width={84}
            height={70}
            className="object-contain absolute"
          />
        </div>

        <div className="max-w-[391px] mx-auto w-full">
          <Button onClick={onViewOrders} className="w-full" variant="primary">
            View Orders
          </Button>
        </div>
      </div>
    </Modal>
  );
};
