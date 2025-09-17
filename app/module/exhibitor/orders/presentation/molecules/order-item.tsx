'use client';

import { ExpandableText } from '@/app/core/shared/components/atoms';
import { ImagePlaceholder } from '@/app/core/shared/components/atoms/image-placeholder';
import { formatCurrency } from '@/app/core/shared/utils';
import Image from 'next/image';

interface OrderItemProps {
  image: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  currency: string;
}

export const OrderItem = ({
  image,
  name,
  description,
  quantity,
  unitPrice,
  currency
}: OrderItemProps) => {
  const hasImage = !!image;

  const totalPrice = unitPrice * quantity;

  const formattedTotalPrice = formatCurrency({
    amount: totalPrice,
    currency
  });

  const formattedUnitPrice = formatCurrency({
    amount: unitPrice,
    currency
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 border border-border py-4 rounded-md px-5">
      <div className="w-[6rem] h-[6rem]">
        {hasImage && (
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className="rounded-[4px] object-contain h-full w-full"
          />
        )}
        {!hasImage && (
          <ImagePlaceholder
            label="No Image"
            className="w-full h-full rounded-[4px] text-xs"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-[15.3px] text-foreground">{name}</h4>
        <ExpandableText className="text-xs font-normal" content={description} />
        <div className="flex">
          <div className="flex gap-7 items-center">
            <p className="text-xs font-medium flex gap-1">
              <span className="text-xs text-foreground">
                {formattedUnitPrice}
              </span>
              <span className="text-xs ">x</span>
              <span className="text-xs">{quantity}</span>
            </p>
            <p className="text-sm font-semibold text-foreground">
              {formattedTotalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
