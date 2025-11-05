'use client';

import { Button } from '@/app/core/shared/components/atoms';
import {
  ConfirmationModal,
  OverlaySpinner
} from '@/app/core/shared/components/molecules';
import { errorHandler } from '@/app/core/shared/utils';
import { FileUp } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  IOrderTracking,
  OrderStatus,
  useOrderById,
  useOrders,
  useUpdateOrderStatus
} from '../../api';
import { OrderDeliveryForm } from '../organisms';

interface OrderStatusControlProps {
  orderId: string;
}

enum ModalType {
  MARK_AS_SHIPPED = OrderStatus.SHIPPED,
  MARK_AS_CONFIRMED = OrderStatus.CONFIRMED,
  MARK_AS_CANCELLED = OrderStatus.CANCELLED,
  MARK_AS_COMPLETED = OrderStatus.COMPLETED,
  ADD_DELIVERY_DETAILS = 'ADD_DELIVERY_DETAILS',
  NONE = 'NONE'
}

export const OrderStatusControl = ({ orderId }: OrderStatusControlProps) => {
  const { refetchOrder, isRefetchingOrder, order } = useOrderById(orderId);
  const { refetchOrders, isRefetchingOrders } = useOrders({});

  const [selectedOrderTracking, setSelectedOrderTracking] =
    useState<IOrderTracking | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const { updateOrderStatus, isPending } = useUpdateOrderStatus({
    onSuccess: () => {
      toast.success('Order status updated successfully.');
      handleCloseModal();
    },
    onError: (error) => {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    }
  });

  const status = order?.status || '';

  const handleCloseModal = () => {
    if (isPending) return;
    refetchOrder();
    refetchOrders();
    setSelectedOrderTracking(null);
    setActiveModal(ModalType.NONE);
  };

  const confirmModal = {
    [ModalType.MARK_AS_SHIPPED]: {
      title: 'Mark as Shipped',
      description: 'Are you sure you want to mark this order as shipped?'
    },
    [ModalType.MARK_AS_CONFIRMED]: {
      title: 'Mark as Paid',
      description: 'Are you sure you want to mark this order as paid?'
    },
    [ModalType.MARK_AS_CANCELLED]: {
      title: 'Mark as Cancelled',
      description: 'Are you sure you want to mark this order as cancelled?'
    },
    [ModalType.MARK_AS_COMPLETED]: {
      title: 'Mark as Completed',
      description: 'Are you sure you want to mark this order as completed?'
    },
    [ModalType.NONE]: {
      title: '',
      description: ''
    }
  } as Record<
    ModalType,
    {
      title: string;
      description: string;
      onConfirm: () => void;
    }
  >;

  const handleUpdateStatus = (status: OrderStatus) => {
    updateOrderStatus({
      orderId,
      status
    });
  };

  const handleConfirm = () => {
    switch (activeModal) {
      case ModalType.MARK_AS_SHIPPED:
        handleUpdateStatus(OrderStatus.SHIPPED);
        break;
      case ModalType.MARK_AS_CONFIRMED:
        handleUpdateStatus(OrderStatus.CONFIRMED);
        break;
      case ModalType.MARK_AS_CANCELLED:
        handleUpdateStatus(OrderStatus.CANCELLED);
        break;
      case ModalType.MARK_AS_COMPLETED:
        handleUpdateStatus(OrderStatus.COMPLETED);
        break;
      default:
        break;
    }
  };

  const isDisabledCancelButton = status !== OrderStatus.PENDING;
  const isDisabledConfirmButton = status !== OrderStatus.PENDING;
  const isDisabledShippedButton = status !== OrderStatus.CONFIRMED;
  const isEnabledCompletedButton = [
    OrderStatus.SHIPPED,
    OrderStatus.INVOICE,
    OrderStatus.CONFIRMED
  ].includes(status as never);

  return (
    <>
      {(isRefetchingOrder || isRefetchingOrders) && <OverlaySpinner />}
      <ConfirmationModal
        title={confirmModal[activeModal]?.title}
        description={confirmModal[activeModal]?.description}
        isOpen={
          activeModal !== ModalType.NONE &&
          activeModal !== ModalType.ADD_DELIVERY_DETAILS
        }
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        isLoading={isPending}
      />

      <OrderDeliveryForm
        isOpen={activeModal === ModalType.ADD_DELIVERY_DETAILS}
        orderId={orderId}
        selectedOrderTracking={selectedOrderTracking}
        onClose={handleCloseModal}
      />

      <div className="py-9 px-10 border bg-background flex justify-between items-center gap-4 flex-wrap">
        {/* Add Delivery Details */}
        <div>
          <Button
            variant="outline"
            className="h-8.5 flex gap-x-1"
            onClick={() => {
              setSelectedOrderTracking(order?.tracking?.[0] || null);
              setActiveModal(ModalType.ADD_DELIVERY_DETAILS);
            }}
          >
            <FileUp size={16} />
            <span>
              {order?.tracking?.[0]
                ? 'Update Delivery Details'
                : 'Add Delivery Details'}
            </span>
          </Button>
        </div>

        <div className="max-w-[46.63rem] w-full flex items-center justify-end flex-wrap gap-4">
          {/* Mark as Confirmed */}
          <Button
            variant="outline"
            className="text-green-600 h-8.5"
            disabled={isDisabledConfirmButton}
            onClick={() => setActiveModal(ModalType.MARK_AS_CONFIRMED)}
          >
            <span>Mark as Paid</span>
          </Button>

          {/* Mark as Shipped */}
          <Button
            variant="outline"
            className="text-yellow-600 h-8.5"
            disabled={isDisabledShippedButton}
            onClick={() => setActiveModal(ModalType.MARK_AS_SHIPPED)}
          >
            <span>Mark as Shipped</span>
          </Button>

          {/* Mark as Cancelled */}
          <Button
            variant="outline"
            className="text-red-600 h-8.5"
            disabled={isDisabledCancelButton}
            onClick={() => setActiveModal(ModalType.MARK_AS_CANCELLED)}
          >
            <span>Mark as Cancelled</span>
          </Button>

          {/* Mark as Completed */}
          <Button
            variant="outline"
            className="text-green-600 h-8.5"
            disabled={!isEnabledCompletedButton}
            onClick={() => setActiveModal(ModalType.MARK_AS_COMPLETED)}
          >
            <span>Mark as Completed</span>
          </Button>
        </div>
      </div>
    </>
  );
};
