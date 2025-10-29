import { formatCurrency } from './format-currency.utils';

interface ConversionParams {
  amount: number;
  from: string;
  to: string;
  rates: Record<string, number>;
}

export function RateConversion({
  amount,
  from,
  to,
  rates
}: ConversionParams): number {
  if (!rates[from] || !rates[to]) {
    return 0;
  }
  const amountInNGN = amount / rates[from];
  const result = amountInNGN * rates[to];
  return result;
}

interface ConvertedPriceParams {
  amount: number;
  from: string;
  to: string;
  rates?: Record<string, number> | null;
}

export const getConvertedPrice = ({
  amount,
  from,
  to,
  rates
}: ConvertedPriceParams): string | null => {
  if (!rates || !rates[from] || !rates[to]) return null;
  try {
    const converted = RateConversion({ amount, from, to, rates });
    return formatCurrency({ amount: converted, currency: to });
  } catch {
    return null;
  }
};
