import { Button } from '@/app/core/shared/components/atoms';
import { formatCurrency } from '@/app/core/shared/utils';
import { useCartSlice } from '../../slice/cart-slice';

interface RequestInvoiceButtonProps {
  className?: string;
  productId?: string;
  currency: string;
}

export const RequestInvoiceButton = ({
  className = '',
  productId,
  currency
}: RequestInvoiceButtonProps) => {
  const { getCartItem } = useCartSlice();
  const item = productId ? getCartItem(productId) : undefined;

  const total = item ? item.basePrice * item.cartQuantity : 0;

  return (
    <Button
      variant="tertiary"
      className={`rounded-[6px] text-sm font-semibold ${className}`}
    >
      REQUEST INVOICE (
      {formatCurrency({
        amount: total,
        currency: currency
      })}
      )
    </Button>
  );
};
