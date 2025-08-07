/**
 * Builds URLSearchParams from an object, excluding undefined, null, or empty string values
 * @param params Object containing potential query parameters
 * @returns string
 */

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function buildQueryParams<T extends Record<string, any>>({
  params,
  appendDefaultLimit = true
}: {
  params: T;
  appendDefaultLimit?: boolean;
}): string {
  const searchParams = new URLSearchParams();

  if ('page' in params && Number(params['page']) === 0) {
    (params as Record<string, string | number>)['page'] = 1;
  }

  if (!('page' in params)) {
    (params as Record<string, string | number>)['page'] = 1;
  }

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  }

  if (appendDefaultLimit && !('limit' in params)) {
    searchParams.append('limit', '8');
  }

  return searchParams.toString();
}
