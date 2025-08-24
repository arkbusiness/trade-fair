'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { CsvIcon } from '../../icons';
import { clientFetcher } from '../../lib';

import { errorHandler } from '../../utils';
import { IconButton, OverlaySpinner } from '../molecules';

export const ExportButton = ({
  apiRoute,
  exportName
}: {
  apiRoute: string;
  exportName: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const response = await clientFetcher({
        method: 'POST',
        url: apiRoute,
        responseType: 'blob'
      });

      const blob = new Blob([response as Blob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportName.toLowerCase()}_export.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <OverlaySpinner />}
      <IconButton
        variant="outline"
        className="stroke-foreground"
        onClick={handleExport}
      >
        <CsvIcon size={16} />
        <span>Export</span>
      </IconButton>
    </>
  );
};
