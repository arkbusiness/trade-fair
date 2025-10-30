import { useCustomQuery } from '@/app/core/shared/hooks';
import { getAttendeeExhibitorScannedBoothOptions } from './exhibitor-query-options';

export const useAttendeeExhibitorScanBooth = (exhibitorId: string) => {
  const { data, isLoading, isRefetching, refetch } = useCustomQuery<{
    scanned: boolean;
  }>({
    ...getAttendeeExhibitorScannedBoothOptions({
      exhibitorId
    }),
    options: {
      enabled: !!exhibitorId
    }
  });

  return {
    isScanned: data?.scanned || false,
    isLoadingExhibitorScanBooth: isLoading,
    isRefetchingExhibitorScanBooth: isRefetching,
    refetchExhibitorScanBooth: refetch
  };
};
