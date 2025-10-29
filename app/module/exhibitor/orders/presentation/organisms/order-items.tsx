import { cn } from '@/app/core/shared/utils';
import { IOrderItems } from '../../hooks';
import { OrderItem } from '../molecules';

interface OrderItemsProps {
  items: IOrderItems['items'];
}

const MAX_ITEMS = 4;

export const OrderItems = ({ items }: OrderItemsProps) => {
  const isGreaterThanMax = items?.length > MAX_ITEMS;
  return (
    <div
      className={cn('flex flex-col gap-5', {
        'overflow-y-auto h-[40rem] py-5 px-4 bg-gray-100 rounded-lg':
          isGreaterThanMax
      })}
    >
      {items.map((item) => (
        <OrderItem
          key={item.id}
          image={item.product?.images?.[0]}
          name={item.product?.name}
          description={item.product?.description}
          quantity={item.quantity}
          unitPrice={item.unitPrice}
          currency={item.product.currency}
        />
      ))}
    </div>
  );
};
