'use client';

import { formatDate } from '@/app/core/shared/lib';
import { cn } from '@/app/core/shared/utils';
import { Banknote, Check, PackageOpen, Truck } from 'lucide-react';
import { useAttendeeOrderById } from '../../api';
import { OrderTimelineEnum } from '@/app/module/exhibitor/orders/api';

const TIMELINE_ITEMS = [
  {
    title: 'Order Placed',
    icon: PackageOpen,
    status: OrderTimelineEnum.CREATED,
    iconColor: 'text-light-blue-2'
  },
  {
    title: 'Payment Confirmed',
    icon: Banknote,
    status: OrderTimelineEnum.PAYMENT_CONFIRMED,
    iconColor: 'text-light-blue-2'
  },
  {
    title: 'Shipped',
    icon: Truck,
    status: OrderTimelineEnum.SHIPPED,
    iconColor: 'text-light-blue-2'
  },
  {
    title: 'Delivered',
    icon: Check,
    status: OrderTimelineEnum.DELIVERED,
    iconColor: 'text-green-500'
  }
];

interface OrderTimelineProps {
  orderId: string;
}

interface TimelineItemProps {
  item: (typeof TIMELINE_ITEMS)[0];
  isCompleted: boolean;
  completedDate?: string;
  isLastItem: boolean;
}

const TimelineItem = ({
  item,
  isCompleted,
  completedDate,
  isLastItem
}: TimelineItemProps) => {
  const IconComponent = item.icon;

  return (
    <div className="flex justify-between items-center relative z-[2] gap-5">
      <div className="flex gap-2 items-center z-[2]">
        <div
          className={cn(
            'w-8 h-8 rounded-full bg-[#deeafa] flex items-center justify-center transition-opacity',
            {
              'opacity-40': !isCompleted
            }
          )}
        >
          <IconComponent size={14} className={item.iconColor} />
        </div>
        <p
          className={cn('font-normal text-xs transition-opacity', {
            'opacity-40': !isCompleted
          })}
        >
          {item.title}
        </p>
      </div>

      <p className="font-normal text-xs">
        {isCompleted && completedDate ? formatDate(completedDate) : 'N/A'}
      </p>

      {!isLastItem && (
        <div
          className={cn(
            'absolute top-0 left-4 w-[2px] h-[56px] bg-light-blue/60 z-[1] transition-opacity',
            {
              'opacity-20': !isCompleted
            }
          )}
        />
      )}
    </div>
  );
};

export const AttendeeOrderTimeline = ({ orderId }: OrderTimelineProps) => {
  const { order } = useAttendeeOrderById(orderId);

  const orderTimeline = order?.OrderTimeLine ?? [];

  const getTimelineItemData = (status: OrderTimelineEnum) => {
    return orderTimeline.find((item) => item.status === status);
  };

  const isTimelineItemCompleted = (status: OrderTimelineEnum) => {
    return orderTimeline.some((item) => item.status === status);
  };

  return (
    <div className="py-5 border-y">
      <h4 className="font-medium uppercase text-foreground opacity-60">
        Order Information
      </h4>
      <div className="flex flex-col gap-6 relative mt-2">
        {TIMELINE_ITEMS.map((item, index) => {
          const timelineData = getTimelineItemData(item.status);
          const isCompleted = isTimelineItemCompleted(item.status);
          const isLastItem = index === TIMELINE_ITEMS.length - 1;

          return (
            <TimelineItem
              key={`${item.title}-${index}`}
              item={item}
              isCompleted={isCompleted}
              completedDate={timelineData?.createdAt}
              isLastItem={isLastItem}
            />
          );
        })}
      </div>
    </div>
  );
};
