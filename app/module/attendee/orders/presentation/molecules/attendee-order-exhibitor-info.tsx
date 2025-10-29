'use client';

import { useAttendeeOrderById } from '../../api';

interface OrderAttendeeInfoProps {
  orderId: string;
}

export const AttendeeOrderExhibitorInfo = ({
  orderId
}: OrderAttendeeInfoProps) => {
  const { order } = useAttendeeOrderById(orderId);
  const exhibitor = order?.exhibitor;

  return (
    <div className="px-6 py-4 border-b bg-gray-light-3">
      <h4 className="font-medium uppercase text-foreground opacity-60">
        Exhibitor Information
      </h4>
      <div className="flex gap-2 text-sm flex-col mt-2">
        <p className="text-foreground font-semibold">
          {exhibitor?.companyName}
        </p>
        <p className="text-light-blue-2">
          <span className="text-foreground">Email:</span>{' '}
          {exhibitor?.contactPhone ?? 'N/A'}
        </p>
        <p>
          <span className="text-foreground">Phone:</span>{' '}
          {exhibitor?.contactPhone ?? 'N/A'}
        </p>
      </div>
    </div>
  );
};
