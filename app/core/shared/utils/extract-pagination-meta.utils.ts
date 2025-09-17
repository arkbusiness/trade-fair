import { IPaginatedResponse } from '../types';

export function extractPaginationMeta<T>(
  response?: IPaginatedResponse<T> | null | undefined
) {
  if (!response) {
    return {
      total: 0,
      page: 0,
      limit: 0,
      pages: 0,
      hasNext: false,
      hasPrev: false
    };
  }

  const { total, page, limit, pages, totalPages } = response;
  const totalPagesCount = pages || totalPages || 0;

  return {
    total,
    page,
    limit: Number(limit),
    pages: totalPagesCount,
    hasNext: page < totalPagesCount,
    hasPrev: page > 1
  };
}
