'use client';

import { formatDate } from '@/app/core/shared/lib';

interface OrderInformationProps {
  orderDate: string;
  address: string;
  paymentMethod: string;
}

export const OrderInformation = ({
  orderDate,
  address,
  paymentMethod
}: OrderInformationProps) => {
  return (
    <div className="py-5 border-t">
      <h4 className="font-semibold text-xs uppercase text-foreground underline">
        Order Information
      </h4>
      <div className="flex gap-2 text-sm flex-col mt-2">
        <p>
          <span className="font-medium text-foreground">Order Date:</span>{' '}
          {orderDate ? formatDate(orderDate) : 'N/A'}
        </p>
        <p>
          <span className="font-medium text-foreground">Address:</span>{' '}
          {address ?? 'N/A'}
        </p>
        <p>
          <span className="font-medium text-foreground">Payment Method:</span>{' '}
          {paymentMethod ?? 'N/A'}
        </p>
      </div>
    </div>
  );
};
