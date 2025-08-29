import {
  DEFAULT_CURRENCY,
  DEFAULT_CURRENCY_SYMBOL
} from '../constants/common.const';

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
  currency = DEFAULT_CURRENCY,
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
  if (formatAmount.includes(DEFAULT_CURRENCY)) {
    formatAmount = formatAmount.replace(
      DEFAULT_CURRENCY,
      DEFAULT_CURRENCY_SYMBOL
    );
  }

  return formatAmount;
};
