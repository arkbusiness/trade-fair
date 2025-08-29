'use client';

import { GoBackButton, LinkButton } from '@/app/core/shared/components/atoms';
import { ExportButton } from '@/app/core/shared/components/organisms/export-button';
import { EXHIBITOR_APP_ROUTES } from '@/app/core/shared/constants';
import { cn } from '@/app/core/shared/utils';
import { MessageCircleMore } from 'lucide-react';
import { OrderStatus } from '../../hooks';
import { ORDER_STATUS_MAP } from '../organisms/orders-table';

interface OrderDetailHeaderProps {
  orderId: string;
  productName: string;
  status: OrderStatus;
}

export const OrderDetailHeader = ({
  orderId,
  productName,
  status
}: OrderDetailHeaderProps) => {
  const orderStatus = status?.toUpperCase() as OrderStatus;
  const statusMap = ORDER_STATUS_MAP[orderStatus];

  return (
    <header className="flex flex-wrap items-center justify-between w-full gap-3">
      <GoBackButton route={EXHIBITOR_APP_ROUTES.inventory.orders.root()} />
      <div className="flex items-center gap-x-[7px]">
        <ExportButton
          apiRoute="/exhibitor/orders/export"
          exportName={`${productName}_order`}
          data={[orderId]}
        />

        <LinkButton
          variant="tertiary"
          className="flex gap-x-[0.63rem] rounded-[6px] h-8"
          href={`${EXHIBITOR_APP_ROUTES.attendees.messaging.root()}`}
        >
          <MessageCircleMore size={16} />
          <span>Contact Attendee</span>
        </LinkButton>
      </div>
      <div className="flex h-[5.31rem] w-full bg-input items-center px-10 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Order Details
          </h3>
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
  );
};
