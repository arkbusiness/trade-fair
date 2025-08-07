/* eslint @typescript-eslint/no-explicit-any: "off" */

export const formatFilters = <
  T extends Record<string, any> | null | undefined,
  L extends Partial<Record<keyof T & string, string>> | null | undefined
>(
  filters: T,
  labels: L
): string[] => {
  if (!filters || !labels) return [];

  return (Object.keys(labels) as (keyof T & string)[])
    .filter((key) => key in filters && filters[key] != null)
    .map((key) => {
      const label = labels[key] ?? key;
      const value = filters[key];
      return `${label}: ${value}`;
    });
};
