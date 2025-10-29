import { create } from 'zustand';

interface SearchState {
  search: string;
  setSearch: (search: string) => void;
  clearSearch: () => void;
}

export const useSearchSlice = create<SearchState>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
  clearSearch: () => set({ search: '' })
}));
