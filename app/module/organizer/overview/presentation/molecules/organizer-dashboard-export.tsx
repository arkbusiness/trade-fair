'use client';

import { LoadingButton } from '@/app/core/shared/components/molecules';
import { clientFetcher } from '@/app/core/shared/lib';
import { errorHandler } from '@/app/core/shared/utils';
import { FileUp } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const OrganizerDashboardExport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async (type: string) => {
    const isPdf = type === 'pdf';
    try {
      setIsLoading(true);
      const response = await clientFetcher({
        method: 'GET',
        url: `/organizer/dashboard/export?type=${type}`,
        responseType: 'blob'
      });

      const blob = new Blob([response as Blob], {
        type: isPdf
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = isPdf ? `${type}_export.pdf` : `${type}_export.xlsx`;
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
    <div className="flex gap-2">
      <LoadingButton
        variant="tertiary"
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => handleExport('pdf')}
      >
        <FileUp />
        <span>Export as PDF</span>
      </LoadingButton>

      <LoadingButton
        variant="highlight"
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => handleExport('csv')}
      >
        <FileUp />
        <span>Export as CSV</span>
      </LoadingButton>
    </div>
  );
};
