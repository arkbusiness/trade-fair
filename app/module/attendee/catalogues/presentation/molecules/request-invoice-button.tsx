import { Button } from '@/app/core/shared/components/atoms';
import { formatCurrency } from '@/app/core/shared/utils';
import { useCartSlice } from '../../slice/cart-slice';
import { useState } from 'react';
import { RequestInvoiceModal } from './request-invoice-modal';

interface RequestInvoiceButtonProps {
  className?: string;
  productId?: string;
  productCurrency: string;
}

export const RequestInvoiceButton = ({
  className = '',
  productId,
  productCurrency
}: RequestInvoiceButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCartItem } = useCartSlice();
  const item = productId ? getCartItem(productId) : undefined;

  const total = item ? item.basePrice * item.cartQuantity : 0;

  const isPriceZero = total === 0;

  const handleModalOpen = () => {
    if (isPriceZero) return;
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <RequestInvoiceModal
        isOpen={isModalOpen}
        productId={productId}
        productCurrency={productCurrency}
        onClose={handleModalClose}
      />

      <Button
        variant="tertiary"
        className={`rounded-[6px] text-sm font-semibold ${className}`}
        onClick={handleModalOpen}
        disabled={isPriceZero}
      >
        REQUEST INVOICE (
        {formatCurrency({
          amount: total,
          currency: productCurrency
        })}
        )
      </Button>
    </>
  );
};
