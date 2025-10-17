'use client';

import { useAttendeeOrderById } from '../../api';

interface AttendeeOrderBankInfoProps {
  orderId: string;
}

export const AttendeeOrderBankInfo = ({
  orderId
}: AttendeeOrderBankInfoProps) => {
  const { order } = useAttendeeOrderById(orderId);

  const paymentDetails = order?.exhibitor?.PaymentDetails?.[0];

  const bankName = paymentDetails?.bankName;
  const bankAccountName = paymentDetails?.bankAccountNumber;
  const bankNo = paymentDetails?.bankAccountNumber;

  return (
    <div className="px-6 py-4 bg-blue-light/50">
      <h4 className="font-medium uppercase text-foreground opacity-60">
        Bank Details
      </h4>
      <div className="flex gap-2 text-sm flex-col mt-2">
        <p>
          <span className="text-foreground">Bank name:</span>{' '}
          {bankName ?? 'N/A'}
        </p>
        <p>
          <span className="text-foreground">Bank account name:</span>{' '}
          {bankAccountName ?? 'N/A'}
        </p>
        <p>
          <span className="text-foreground">Bank account number:</span>{' '}
          {bankNo ?? 'N/A'}
        </p>
      </div>
    </div>
  );
};
