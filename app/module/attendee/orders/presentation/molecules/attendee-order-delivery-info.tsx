'use client';

import { useAttendeeOrderById } from '../../api';

interface AttendeeOrderDeliveryInfoProps {
  orderId: string;
}

export const AttendeeOrderDeliveryInfo = ({
  orderId
}: AttendeeOrderDeliveryInfoProps) => {
  const { order } = useAttendeeOrderById(orderId);

  const deliveryAddress = order?.attendee?.address;

  return (
    <div className="px-6 py-4 border-b bg-gray-light-3">
      <h4 className="font-medium uppercase text-foreground opacity-60">
        Delivery Information
      </h4>
      <div className="flex gap-2 text-sm flex-col mt-2">
        <p>{deliveryAddress ?? 'N/A'}</p>
      </div>
    </div>
  );
};
