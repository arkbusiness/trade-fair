'use client';

import { useExhibitorUser } from '@/app/core/shared/api/use-exhibitor-user';
import {
  Card,
  CardFooter,
  CardHeader,
  Skeleton
} from '@/app/core/shared/components/atoms';
import { formatCurrency } from '@/app/core/shared/utils';
import { ShoppingCart, Users, Wallet } from 'lucide-react';

interface ExhibitorOrdersStatProps {
  isLoading: boolean;
  totalSale: Record<string, number>;
  invoiceRequested: number;
  totalCustomers: number;
}

export const ExhibitorOrdersStat = ({
  isLoading,
  totalSale,
  invoiceRequested = 0,
  totalCustomers = 0
}: ExhibitorOrdersStatProps) => {
  const { currency } = useExhibitorUser();
  const totalSaleValue = totalSale?.[currency as string] ?? 0;

  const STATS = [
    {
      title: 'Total Sales',
      value: formatCurrency({
        amount: totalSaleValue,
        currency: currency
      }),
      icon: (
        <div className="w-6 h-6 rounded-[2px] flex items-center justify-center bg-[#DCF2E6] text-foreground/60">
          <ShoppingCart size={16} />
        </div>
      )
    },
    {
      title: 'Invoice Requested',
      value: invoiceRequested.toLocaleString(),
      icon: (
        <div className="w-6 h-6 rounded-[2px] flex items-center justify-center bg-foreground text-background">
          <Wallet size={16} />
        </div>
      )
    },
    {
      title: 'Total Customers',
      value: totalCustomers.toLocaleString(),
      icon: (
        <div className="w-6 h-6 rounded-[2px] flex items-center justify-center bg-[#FFF8E8] text-foreground/60">
          <Users size={16} />
        </div>
      )
    }
  ];

  return (
    <>
      {isLoading ? (
        <OrdersStatSkeleton />
      ) : (
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(290px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
            {STATS.map((stat) => {
              return (
                <Card
                  key={stat.title}
                  className="w-full justify-between px-2 pt-[10px] pb-3"
                >
                  <CardHeader className="relative w-full">
                    <p className="text-sm font-medium text-foreground mb-2">
                      {stat.title}
                    </p>
                    <span>{stat.icon}</span>
                  </CardHeader>
                  <CardFooter className="w-full gap-1 flex-col items-start mt-5">
                    <div className="flex justify-between w-full">
                      <h2 className="md:text-2xl text-xl font-semibold">
                        {stat.value}
                      </h2>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const OrdersStatSkeleton = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(253px,_1fr))] items-stretch  gap-x-[0.75rem] gap-y-2">
      {Array.from({ length: 4 }).map((_, index) => {
        const key = `orders-stat-${index}`;
        return (
          <Card key={key} className="w-full justify-between">
            <CardHeader className="relative">
              <Skeleton className="h-6 w-6 rounded-full" />
            </CardHeader>
            <CardFooter className="w-full gap-[9px] flex-col items-start">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-full" />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
