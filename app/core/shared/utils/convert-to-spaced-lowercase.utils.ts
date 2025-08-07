export const convertToSpacedLowercase = (str: string) => {
  if (!str) return '';
  return str
    .replace(/[_]|([a-z])([A-Z])/g, (match, p1, p2) => {
      if (p1 && p2) {
        return `${p1} ${p2}`;
      }
      return ' ';
    })
    .toLowerCase();
};
