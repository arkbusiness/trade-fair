export function compactNumber(value: number): string {
  const absNumber = Math.abs(value);
  let compacted;

  if (absNumber >= 1_000_000_000_000) {
    compacted = (value / 1_000_000_000_000).toFixed(1) + 'T';
  } else if (absNumber >= 1_000_000_000) {
    compacted = (value / 1_000_000_000).toFixed(1) + 'B';
  } else if (absNumber >= 1_000_000) {
    compacted = (value / 1_000_000).toFixed(1) + 'M';
  } else if (absNumber >= 1_000) {
    compacted = (value / 1_000).toFixed(1) + 'K';
  } else {
    compacted = value.toString();
  }

  compacted = compacted.replace(/\.0([KMBT])$/, '$1');

  return compacted;
}
