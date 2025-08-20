'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Spinner
} from '@/app/core/shared/components/atoms';
import { BoothCategorySelect } from '@/app/core/shared/components/organisms';
import { useBoothCategories } from '@/app/core/shared/hooks/api';
import { cn, formatCurrency } from '@/app/core/shared/utils';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useOrganizerOverview } from '../../hooks';

const chartConfig = {
  currentYear: {
    label: 'Current Year: ',
    color: '#e71623'
  },
  previousYear: {
    label: 'Previous Year: ',
    color: '#f6af30'
  }
} satisfies ChartConfig;

const CurrencyFormatter = (value: number) => {
  return formatCurrency({ amount: value, currency: 'NGN' });
};

export const OrganizerRevenueChart = () => {
  const { firstCategory } = useBoothCategories();
  const form = useForm<{ categoryId: { id: string; name: string } | null }>({
    values: {
      categoryId: firstCategory ?? null
    },
    mode: 'onChange'
  });

  const watchedCategoryId = form.watch('categoryId');
  const hasCategoryId = !!watchedCategoryId;

  useEffect(() => {
    if (!watchedCategoryId && firstCategory) {
      form.setValue('categoryId', {
        id: firstCategory.id,
        name: firstCategory.name
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstCategory]);

  const { overviewStats, isLoadingOverviewStats, isRefetchingOverviewStats } =
    useOrganizerOverview({
      categoryId: watchedCategoryId?.id || ''
    });
  const isLoading = isLoadingOverviewStats || isRefetchingOverviewStats;

  const { charts } = overviewStats ?? {};
  const orders = charts?.dailyOrderAmounts ?? {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0
  };

  const orderArray = Object.entries(orders).map(([name, amount]) => ({
    name,
    amount
  }));

  return (
    <Card className="w-full justify-between">
      <CardHeader className="relative">
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <CardDescription className="text-foreground font-medium text-base">
            Revenue Chart
          </CardDescription>
          <div
            className={cn('h-[37px] w-[110px]', {
              'w-auto': hasCategoryId
            })}
          >
            <BoothCategorySelect
              label=""
              placeholder="Category"
              name="categoryId"
              onSelectChange={(value) => {
                form.setValue('categoryId', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true
                });
              }}
              form={form}
              showHelperText={false}
              classNames={{
                placeholder: () => 'text-foreground!',
                indicatorSeparator: () => 'hidden'
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 w-full">
          {/* TODO: Missing in the api */}
          {/* <div className="my-3.5">
            <h3 className="text-foreground font-semibold text-xl">
              {formatCurrency({
                amount: 46000000,
                currency: 'NGN',
                compactThreshold: 0
              })}
            </h3>
          </div> */}
          {/* Chart */}
          <>
            {!isLoading && (
              <ChartContainer
                config={chartConfig}
                className="h-[245px] min-h-[200px] w-full"
              >
                <BarChart data={orderArray}>
                  <XAxis
                    dataKey="name"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                  />

                  <YAxis
                    tickFormatter={CurrencyFormatter}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => {
                      return `Amount: ${formatCurrency({ amount: (value as number) ?? 0, currency: 'NGN', compactThreshold: 0 })}`;
                    }}
                  />

                  <Bar dataKey="amount" fill="#0088FF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ChartContainer>
            )}
            {isLoading && <Spinner />}
          </>
        </div>
      </CardContent>
    </Card>
  );
};
