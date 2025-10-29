'use client';

import { LinkButton } from '@/app/core/shared/components/atoms';
import { DownloadIcon } from 'lucide-react';
import { useAttendeeOrderById } from '../../api';
import { formatDate } from '@/app/core/shared/lib';

interface AttendeeOrderInfoProps {
  orderId: string;
}

export const AttendeeOrderInfo = ({ orderId }: AttendeeOrderInfoProps) => {
  const { order } = useAttendeeOrderById(orderId);

  const paymentSlip = order?.payment_slip;
  const hasPaymentSlip = !!paymentSlip;

  const orderDate = order?.createdAt;
  const receiptDate = order?.payment_slip_uploaded_at;
  const paymentMethod = order?.payment_method;

  return (
    <div className="px-6 py-4 border-b bg-gray-light-3">
      <h4 className="font-medium uppercase text-foreground opacity-60">
        Order Information
      </h4>
      <div className="flex gap-2 text-sm flex-col mt-2">
        <p>
          <span className="text-foreground">Order Date:</span>{' '}
          {orderDate ? formatDate(orderDate) : 'N/A'}
        </p>
        <p>
          <span className="text-foreground">Uploaded receipt date:</span>{' '}
          {receiptDate ? formatDate(receiptDate) : 'N/A'}
        </p>
        <p>
          <span className="text-foreground">Payment method:</span>{' '}
          {paymentMethod || 'N/A'}
        </p>
        {hasPaymentSlip && (
          <div className="max-w-[12.19rem] w-full">
            <LinkButton
              variant="highlight"
              className="flex gap-x-[0.63rem]"
              download
              target="_blank"
              rel="noopener noreferrer"
              href={paymentSlip}
            >
              <DownloadIcon size={16} />
              <span>Download Payment Slip</span>
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
};
