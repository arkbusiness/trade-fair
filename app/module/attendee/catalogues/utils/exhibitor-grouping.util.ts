export interface ExhibitorGroup<T> {
  letter: string;
  exhibitors: T[];
}

export interface ExhibitorWithCompanyName {
  companyName: string;
}

/**
 * Groups exhibitors alphabetically by their first letter
 * @param exhibitors Array of exhibitors with companyName property
 * @returns Array of grouped exhibitors sorted alphabetically
 */
export const groupExhibitorsByLetter = <T extends ExhibitorWithCompanyName>(
  exhibitors: T[]
): ExhibitorGroup<T>[] => {
  const groups: { [key: string]: T[] } = {};

  exhibitors.forEach((exhibitor) => {
    const firstLetter = exhibitor.companyName.charAt(0).toUpperCase();
    const groupKey = /^[A-Z]$/.test(firstLetter) ? firstLetter : '#';

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(exhibitor);
  });

  // Sort groups alphabetically, with # first
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a === '#') return -1;
    if (b === '#') return 1;
    return a.localeCompare(b);
  });

  return sortedKeys.map((key) => ({
    letter: key,
    exhibitors: groups[key].sort((a, b) =>
      a.companyName.localeCompare(b.companyName)
    )
  }));
};
