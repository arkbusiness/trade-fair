import { getQueryClient, serverFetcher } from '@/app/core/shared/lib';
import { attendeeOrderQueryKeys } from '../../constants';
import { notFound } from 'next/navigation';
import { IOrderItem } from '@/app/module/exhibitor/orders/hooks';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {
  AttendeeOrderBankInfo,
  AttendeeOrderDeliveryInfo,
  AttendeeOrderDetailHeader,
  AttendeeOrderExhibitorInfo,
  AttendeeOrderInfo,
  AttendeeOrderItems,
  AttendeeOrderTimeline
} from '../molecules';

interface AttendeeOrderDetailPageProps {
  id: string;
}

export const AttendeeOrderDetailPage = async ({
  id
}: AttendeeOrderDetailPageProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: attendeeOrderQueryKeys.byId(id),
    queryFn: () => {
      return serverFetcher({
        url: `/attendee/order/${id}`
      });
    }
  });

  const order = (await queryClient.getQueryData(
    attendeeOrderQueryKeys.byId(id)
  )) as IOrderItem;

  if (!order) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AttendeeOrderDetailHeader orderId={id} />
      <div className="mt-8.5 flex flex-col gap-5">
        <AttendeeOrderItems orderId={id} />
        <AttendeeOrderExhibitorInfo orderId={id} />
        <AttendeeOrderInfo orderId={id} />
        <AttendeeOrderDeliveryInfo orderId={id} />
        <AttendeeOrderBankInfo orderId={id} />
        <AttendeeOrderTimeline orderId={id} />
      </div>
    </HydrationBoundary>
  );
};
