'use client';

import {
  Button,
  GoBackButton,
  LinkButton
} from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { cn } from '@/app/core/shared/utils';
import { OrderStatus } from '@/app/module/exhibitor/orders/hooks';
import { ORDER_STATUS_MAP } from '@/app/module/exhibitor/orders/presentation/organisms';
import { FileUp, MessageCircleMore } from 'lucide-react';
import { useState } from 'react';
import { useAttendeeOrderById } from '../../api';
import { AttendeeOrderReceiptUploadForm } from '../atoms';

interface OrderDetailHeaderProps {
  orderId: string;
}

export const AttendeeOrderDetailHeader = ({
  orderId
}: OrderDetailHeaderProps) => {
  const [showUploadReceiptModal, setShowUploadReceiptModal] = useState(false);
  const { order, refetchOrder } = useAttendeeOrderById(orderId);
  const status = order ? order.status : '';

  const isCompleted = status === OrderStatus.COMPLETED;

  const handleCloseModal = () => {
    setShowUploadReceiptModal(false);
    refetchOrder();
  };

  const orderStatus = status?.toUpperCase() as OrderStatus;
  const statusMap = ORDER_STATUS_MAP[orderStatus];

  return (
    <>
      <AttendeeOrderReceiptUploadForm
        orderId={orderId}
        isOpen={showUploadReceiptModal}
        onClose={handleCloseModal}
      />
      <header className="flex flex-wrap items-center justify-between flex-col w-full gap-8.5">
        <div className="flex items-center gap-x-[7px] px-6 w-full justify-between">
          <GoBackButton
            route={ATTENDEE_APP_ROUTES.orders.root()}
            title="Back to Orders"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8.5 flex gap-x-1"
              onClick={() => {
                setShowUploadReceiptModal(true);
              }}
              disabled={isCompleted}
            >
              <FileUp size={16} />
              <span>Upload Receipt</span>
            </Button>

            <LinkButton
              variant="tertiary"
              className="flex gap-x-[0.63rem] rounded-[6px] h-8"
              href={`${ATTENDEE_APP_ROUTES.messages.root()}?exhibitorId=${order?.exhibitorId}`}
            >
              <MessageCircleMore size={16} />
              <span>Contact Exhibitor</span>
            </LinkButton>
          </div>
        </div>
        <div className="flex h-[5.31rem] w-full bg-gray-light-3 items-center px-6 justify-between flex-wrap gap-5">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Order Details
            </h3>
            <p className="text-[0.81rem] font-normal mt-1">
              Order-{orderId?.slice(-6)}
            </p>
          </div>

          <span
            className={cn(
              'px-3 h-[35px] max-w-min rounded-[4px] text-xs flex justify-center items-center relative font-medium',
              statusMap.style.bg,
              statusMap.style.text
            )}
          >
            <span> {statusMap.label}</span>
          </span>
        </div>
      </header>
    </>
  );
};
