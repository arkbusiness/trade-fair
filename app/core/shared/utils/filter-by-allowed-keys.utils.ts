/**
 * Filters an object and returns a new object containing only the allowed keys.
 *
 * @template T - A record with string keys and values of type string or number.
 * @param {T} obj - The source object to filter.
 * @param {readonly string[]} allowedKeys - An array of keys that should be retained in the result.
 * @returns {Partial<T>} A new object containing only the key-value pairs from `obj` whose keys are in `allowedKeys`.
 *
 * @example
 * const data = { search: 'item', page: 1, invalidKey: 'remove' };
 * const allowed = ['search', 'page'];
 * const result = filterByAllowedKeys(data, allowed);
 * // result: { search: 'item', page: 1 }
 */
export function filterByAllowedKeys<T extends Record<string, string>>(
  obj: T,
  allowedKeys: readonly string[]
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (allowedKeys.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
