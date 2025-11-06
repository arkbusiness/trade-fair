import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getOrderByIdQueryOptions } from '../../api/order-query-options';
import type { IOrderItems } from '../../api';
import { OrderDetailHeader } from '../atoms';
import { OrderItems } from '../organisms';
import {
  OrderAttendeeInfo,
  OrderInformation,
  OrderStatusControl,
  OrderTimeline
} from '../molecules';

interface OrderDetailsPageProps {
  id: string;
}

export const OrderDetailsPage = async ({ id }: OrderDetailsPageProps) => {
  const queryClient = getQueryClient();

  const queryOptions = getOrderByIdQueryOptions(id);

  await queryClient.prefetchQuery({
    queryKey: queryOptions.queryKey,
    queryFn: () => {
      return serverFetcher({
        url: queryOptions.url
      });
    }
  });

  const order = (await queryClient.getQueryData(
    queryOptions.queryKey
  )) as IOrderItems;

  if (!order) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col">
        <OrderDetailHeader orderId={id} />
        <div className="mt-5">
          <OrderItems items={order.items} />
        </div>
        <OrderAttendeeInfo orderId={id} />
        <OrderInformation
          orderDate={order.createdAt}
          address={order.attendee?.address ?? 'N/A'}
          paymentMethod={order.payment_method ?? 'N/A'}
        />
        <OrderTimeline orderId={id} />
        <div className="mt-5">
          <OrderStatusControl orderId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};
