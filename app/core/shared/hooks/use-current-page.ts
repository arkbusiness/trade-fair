'use client';

import { useSearchParams } from 'next/navigation';

export const useCurrentPage = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') ?? '1';
  return currentPage;
};
