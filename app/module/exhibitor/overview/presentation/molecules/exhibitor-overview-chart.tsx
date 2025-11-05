'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Spinner
} from '@/app/core/shared/components/atoms';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useExhibitorOverview } from '../../api';
import { formatCurrency } from '@/app/core/shared/utils';
import { useExhibitorUser } from '@/app/core/shared/hooks/api/use-exhibitor-user';

const currencyFormatter = (value: number, currency: string) => {
  return formatCurrency({ amount: value, currency });
};

export const ExhibitorOverviewChart = () => {
  const { currency } = useExhibitorUser();

  const { overviewStats, isLoadingOverviewStats, isRefetchingOverviewStats } =
    useExhibitorOverview();

  const isLoading = isLoadingOverviewStats || isRefetchingOverviewStats;

  const chartData = overviewStats?.chartData ?? {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0
  };

  const orderComparison = overviewStats?.orderComparison ?? {
    today: 0,
    yesterday: 0,
    difference: 0
  };

  const hasChartData = Object.values(chartData).some((amount) => amount > 0);

  const orderArray = Object.entries(chartData).map(([name, amount]) => ({
    name,
    amount
  }));
  const totalAmount = Object.values(chartData).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-[8px] border border-input bg-background">
      <h2 className="text-lg font-semibold text-foreground px-3.5 py-4.5 border-b">
        Sales Overview
      </h2>
      <div className="mt-7 px-6">
        <div className="mt-2 mb-4">
          <h3 className="text-foreground font-semibold text-xl">
            {formatCurrency({
              amount: totalAmount,
              currency,
              compactThreshold: 0
            })}
          </h3>
          <p className="text-xs text-secondary mt-2 flex items-center gap-1">
            <span className="text-green-600 font-semibold">
              {formatCurrency({
                amount: orderComparison.difference,
                currency,
                compactThreshold: 0
              })}
            </span>
            <span>more than yesterday</span>
          </p>
        </div>
        {!isLoading && hasChartData && (
          <ChartContainer
            config={{}}
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
                tickFormatter={(value) => currencyFormatter(value, currency)}
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax']}
                scale="linear"
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value) => {
                  return `Amount: ${formatCurrency({ amount: (value as number) ?? 0, currency, compactThreshold: 0 })}`;
                }}
              />

              <Bar dataKey="amount" fill="#0088FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
        {isLoading && <Spinner />}
        {!isLoading && !hasChartData && (
          <p className="text-center text-foreground mb-10 flex items-center justify-center">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};
