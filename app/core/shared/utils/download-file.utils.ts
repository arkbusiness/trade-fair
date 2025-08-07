/**
 * Downloads a file from a given url and saves it with the given filename.
 * @param url The url of the file to download.
 * @param filename The filename to save the file as.
 */
export const download: (url: string, filename: string) => void = (
  url,
  filename
) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
