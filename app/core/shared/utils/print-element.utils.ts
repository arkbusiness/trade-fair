interface PrintElementOptions {
  elementId: string;
  title?: string;
  additionalStyles?: string;
}

/**
 * Prints a specific element by its ID in a new window
 * @param options - Configuration options for printing
 * @param options.elementId - The ID of the element to print
 * @param options.title - Optional title for the print document
 * @param options.additionalStyles - Optional additional CSS styles
 */
export const printElement = ({
  elementId,
  title = 'Print Document',
  additionalStyles = ''
}: PrintElementOptions): void => {
  const printElement = document.getElementById(elementId);

  if (!printElement) {
    console.warn(`Element with ID "${elementId}" not found`);
    return;
  }

  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    console.warn('Unable to open print window. Please check popup blockers.');
    return;
  }

  const printDocument = printWindow.document;

  // Create HTML structure
  printDocument.documentElement.innerHTML = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            margin: 20px; 
            line-height: 1.6;
            color: #333;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
          }
          ${additionalStyles}
        </style>
      </head>
      <body></body>
    </html>
  `;

  // Clone and append the content
  const clonedElement = printElement.cloneNode(true) as HTMLElement;
  printDocument.body.appendChild(clonedElement);

  // Print and close
  printWindow.print();
  printWindow.close();
};
