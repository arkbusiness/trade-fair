import { IPaginatedResponse } from '../types';

export function extractPaginationMeta<T>(
  response?: IPaginatedResponse<T> | null | undefined
) {
  if (!response) {
    return {
      total: 0,
      page: 0,
      limit: 0,
      pages: 0
    };
  }

  const { total, page, limit, pages, totalPages } = response;
  return { total, page, limit: Number(limit), pages: pages || totalPages || 0 };
}
