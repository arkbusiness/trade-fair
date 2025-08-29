import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { IOrderItem } from '../../hooks';
import { orderService } from '../../services';
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

  await queryClient.prefetchQuery({
    queryKey: orderService.getById(id).queryKey,
    queryFn: () => {
      return serverFetcher({
        url: orderService.getById(id).url
      });
    }
  });

  const order = (await queryClient.getQueryData(
    orderService.getById(id).queryKey
  )) as IOrderItem;

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
          //TODO: REMOVE HARD CODED
          address="15 Victoria Island, Lagos, Nigeria"
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
