/**
 * Extracts the file extension (e.g., 'pdf') from a MIME type (e.g., 'application/pdf').
 *
 * @param mimeType - The MIME type string.
 * @returns The file extension (e.g., 'pdf'), 'N/A' if the format is invalid.
 */
export function getFileExtensionFromMimeType(mimeType: string): string {
  const parts = mimeType.split('/');
  return parts.length === 2 ? parts[1] : 'N/A';
}
