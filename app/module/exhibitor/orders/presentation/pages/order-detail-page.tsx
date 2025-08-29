import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { IOrderItem } from '../../hooks';
import { orderService } from '../../services';
import { OrderDetailHeader } from '../atoms';
import { OrderItems } from '../organisms';
import { OrderAttendeeInfo } from '../molecules';

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

  const productName = order.items[0].product?.name;
  const attendee = order?.attendee ?? {
    contactName: 'N/A',
    email: 'N/A',
    phone: 'N/A'
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-5">
        <OrderDetailHeader
          orderId={id}
          status={order.status}
          productName={productName}
        />
        <OrderItems items={order.items} />
        <OrderAttendeeInfo
          name={attendee.contactName}
          email={attendee.email}
          phone={attendee.phone ?? 'N/A'}
          paymentSlip={order.payment_slip}
        />
      </div>
    </HydrationBoundary>
  );
};
