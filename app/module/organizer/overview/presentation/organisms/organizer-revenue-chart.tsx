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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner
} from '@/app/core/shared/components/atoms';
import { formatCurrency } from '@/app/core/shared/utils';

import { useState } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useOrganizerOverview } from '../../hooks';

enum TIME_RANGE_ENUM {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

const TIME_RANGE = [
  {
    label: 'Daily',
    value: TIME_RANGE_ENUM.DAILY
  },
  {
    label: 'Weekly',
    value: TIME_RANGE_ENUM.WEEKLY
  },
  {
    label: 'Monthly',
    value: TIME_RANGE_ENUM.MONTHLY
  },
  {
    label: 'Yearly',
    value: TIME_RANGE_ENUM.YEARLY
  }
];

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
  const { overviewStats, isLoadingOverviewStats, isRefetchingOverviewStats } =
    useOrganizerOverview();
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

  const [range, setRange] = useState(TIME_RANGE_ENUM.DAILY);

  const handleRangeSelection = (value: TIME_RANGE_ENUM) => {
    setRange(value);
  };

  return (
    <Card className="w-full justify-between">
      <CardHeader className="relative">
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <CardDescription className="text-foreground font-medium text-base">
            Revenue Chart
          </CardDescription>
          <div className="h-[37px]">
            <Select value={range} onValueChange={handleRangeSelection}>
              <SelectTrigger className="cursor-pointer bg-tertiary text-background border-0 h-full! min-h-full!">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGE.map((timeRange) => (
                  <SelectItem key={timeRange.value} value={timeRange.value}>
                    {timeRange.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 w-full">
          <div className="my-3.5">
            <h3 className="text-foreground font-semibold text-xl">
              {formatCurrency({
                amount: 46000000,
                currency: 'NGN',
                compactThreshold: 0
              })}
            </h3>
          </div>
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
