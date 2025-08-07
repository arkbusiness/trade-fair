export function encodeId(id: string | number) {
  return btoa(id.toString());
}

export function decodeId(encoded: string) {
  try {
    return atob(encoded);
  } catch (e) {
    console.error('Failed to decode ID:', e);
    return null;
  }
}
