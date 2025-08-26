import { CURRENCY, CURRENCY_SYMBOL } from '../constants/common.const';

type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  compactThreshold?: number;
  amount: number;
};

export const formatCurrency = ({
  amount,
  locale = 'en-US',
  currency = CURRENCY,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
  compactThreshold = 0
}: FormatCurrencyOptions): string => {
  const useCompact =
    compactThreshold > 0 ? Math.abs(amount) >= compactThreshold : false;

  let formatAmount = Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation: useCompact ? 'compact' : 'standard',
    compactDisplay: 'short'
  }).format(amount);

  // Replace NGN with custom symbol if needed
  if (formatAmount.includes('NGN')) {
    formatAmount = formatAmount.replace('NGN', CURRENCY_SYMBOL);
  }

  return formatAmount;
};
