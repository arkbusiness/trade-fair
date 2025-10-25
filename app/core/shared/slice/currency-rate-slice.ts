import { create } from 'zustand';

export type RateConversion = Record<string, number>;

interface CurrencyRateState {
  rates: RateConversion | null;
  saveRates: (rates: RateConversion) => void;
  clearRates: () => void;
}

export const useCurrencyRateSlice = create<CurrencyRateState>((set) => ({
  rates: null,
  saveRates: (rates: RateConversion) => set({ rates }),
  clearRates: () => set({ rates: null })
}));
