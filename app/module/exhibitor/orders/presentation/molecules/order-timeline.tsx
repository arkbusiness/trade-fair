'use client';

import { formatDate } from '@/app/core/shared/lib';
import { cn } from '@/app/core/shared/utils';
import { Check, PackageOpen, Truck } from 'lucide-react';
import { IOrderTimeline, OrderTimelineEnum } from '../../hooks';

const TIMELINE_ITEMS = [
  {
    title: 'Order Placed',
    icon: <PackageOpen size={14} className="text-light-blue-2" />,
    status: OrderTimelineEnum.CREATED
  },
  {
    title: 'Payment Confirmed',
    icon: <Check size={14} className="text-light-blue-2" />,
    status: OrderTimelineEnum.PAYMENT_CONFIRMED
  },
  {
    title: 'Shipped',
    icon: <Truck size={14} className="text-light-blue-2" />,
    status: OrderTimelineEnum.SHIPPED
  },
  {
    title: 'Delivered',
    icon: <Check size={14} className="text-green-500" />,
    status: OrderTimelineEnum.DELIVERED
  }
];

interface OrderTimelineProps {
  orderTimeline: IOrderTimeline[];
}

export const OrderTimeline = ({ orderTimeline }: OrderTimelineProps) => {
  return (
    <div className="py-5 border-t">
      <div className="flex flex-col gap-6 relative">
        {TIMELINE_ITEMS.map((tm, index) => {
          const key = `${tm.title}-${index}`;

          const orderTimelineItem = orderTimeline.find(
            (ot) => ot.status === tm.status
          );
          const isTimelineItemCompleted = orderTimeline.some(
            (ot) => ot.status === tm.status
          );

          return (
            <div
              key={key}
              className="flex justify-between items-center relative z-[2] gap-5"
            >
              <div className="flex gap-2 items-center z-[2]">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full bg-[#deeafa] flex items-center justify-center',
                    {
                      'opacity-40': !isTimelineItemCompleted
                    }
                  )}
                >
                  {tm.icon}
                </div>
                <p
                  className={cn('font-normal text-xs', {
                    'opacity-40': !isTimelineItemCompleted
                  })}
                >
                  {tm.title}
                </p>
              </div>

              <p className="font-normal text-xs">
                {isTimelineItemCompleted && orderTimelineItem
                  ? formatDate(orderTimelineItem?.createdAt as string)
                  : 'N/A'}
              </p>

              {index < TIMELINE_ITEMS.length - 1 && (
                <div
                  className={cn(
                    'absolute top-0 left-4 w-[2px] h-[56px] bg-light-blue/60 z-[1]',
                    {
                      'opacity-20': !isTimelineItemCompleted
                    }
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
