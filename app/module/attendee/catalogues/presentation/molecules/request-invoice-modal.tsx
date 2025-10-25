'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { useCartSlice } from '../../slice/cart-slice';
import { useRequestInvoice } from '../../api';
import toast from 'react-hot-toast';
import {
  errorHandler,
  formatCurrency,
  getConvertedPrice
} from '@/app/core/shared/utils';
import { CurrencyConverter } from '@/app/core/shared/components/organisms';
import { useAttendeeUser } from '@/app/core/shared/hooks/api';
import { useCurrencyRateSlice } from '@/app/core/shared/slice/currency-rate-slice';
import { ArrowLeftRight } from 'lucide-react';
import { OrderSuccessModal } from './order-success-modal';
import { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';

interface RequestInvoiceModalProps {
  isOpen: boolean;
  productId?: string;
  productCurrency: string;
  onClose: () => void;
}

export const RequestInvoiceModal = ({
  isOpen,
  productId,
  productCurrency,
  onClose
}: RequestInvoiceModalProps) => {
  const router = useRouter();
  const { currency: userCurrency } = useAttendeeUser();
  const { getCartItem, removeFromCart } = useCartSlice();
  const { rates } = useCurrencyRateSlice();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { requestInvoiceMutation, isPending } = useRequestInvoice({
    onSuccess: () => {
      onClose();
      setShowSuccessModal(true);
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

  const item = productId ? getCartItem(productId) : undefined;
  const basePrice = item?.basePrice || 0;
  const totalPrice = item ? basePrice * item.cartQuantity : 0;

  const convertedTotalPrice = getConvertedPrice({
    amount: totalPrice,
    from: productCurrency,
    to: userCurrency,
    rates
  });

  const handleRequestInvoice = () => {
    if (!productId || !item) return;
    requestInvoiceMutation({
      items: [
        {
          productId: productId,
          quantity: item.cartQuantity,
          price: item.basePrice
        }
      ]
    });
  };

  const handleCloseModal = () => {
    if (isPending) return;
    onClose();
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
    removeFromCart(productId as string);
  };

  const handleGoToOrders = () => {
    removeFromCart(productId as string);
    router.push(ATTENDEE_APP_ROUTES.orders.root());
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Request Invoice"
        description=""
        contentClassName="px-0 pb-0 overflow-hidden max-w-[500px] sm:max-w-[524px]"
        headerClassName="px-6"
      >
        <div className="flex flex-col gap-[1.86rem] w-full text-left relative mt-8">
          <div className="px-8">
            <p className="font-semibold text-foreground">Selected Product</p>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground text-sm">
                    {item?.name}
                  </p>
                  <div className="text-sm opacity-80">
                    <span>x</span>
                    <span>{item?.cartQuantity}</span>
                  </div>
                </div>
                <p className="font-semibold text-foreground">
                  {formatCurrency({
                    amount: basePrice,
                    currency: productCurrency
                  })}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="font-semibold text-foreground">Total</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground text-xl">
                  {formatCurrency({
                    amount: totalPrice,
                    currency: productCurrency
                  })}
                </p>
                {convertedTotalPrice && (
                  <div className="flex items-center gap-2">
                    <ArrowLeftRight className="text-light-blue" size={16} />
                    <p className="font-semibold text-foreground text-xl">
                      {convertedTotalPrice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-8">
            <CurrencyConverter
              productCurrency={productCurrency}
              userCurrency={userCurrency}
              ratesEndpoint="/attendee/rates"
            />
          </div>
          <div className="mt-[10.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
            <Button
              variant="outline"
              className="gap-[0.5rem] flex items-center h-8"
              type="button"
              onClick={handleCloseModal}
              disabled={isPending}
            >
              <span>Cancel</span>
            </Button>

            <LoadingButton
              variant="tertiary"
              className="gap-[0.5rem] flex items-center h-8"
              type="submit"
              isLoading={isPending}
              disabled={isPending}
              onClick={handleRequestInvoice}
            >
              <span>Submit Request</span>
            </LoadingButton>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        onViewOrders={handleGoToOrders}
      />
    </>
  );
};
