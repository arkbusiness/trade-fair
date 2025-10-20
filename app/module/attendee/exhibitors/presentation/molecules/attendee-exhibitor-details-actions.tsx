'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { useAttendeeExhibitorScanBooth } from '../../api';
import { Calendar, Lock } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';

interface AttendeeExhibitorDetailsActionsProps {
  exhibitorId: string;
}

export const AttendeeExhibitorDetailsActions = ({
  exhibitorId
}: AttendeeExhibitorDetailsActionsProps) => {
  const router = useRouter();
  const { isScanned, isLoadingExhibitorScanBooth } =
    useAttendeeExhibitorScanBooth(exhibitorId);

  const isEnableMessageButton = !isLoadingExhibitorScanBooth && isScanned;

  return (
    <>
      <div className="grid grid-cols-2 gap-4.5 w-full max-w-[658px]">
        <Button
          variant="secondary"
          disabled={!isEnableMessageButton}
          className="w-fu1ll"
          onClick={() => {
            router.push(`/attendee/messages?exhibitorId=${exhibitorId}`);
          }}
        >
          <Lock size={16} />
          <span>Send Message</span>
        </Button>

        <Button
          variant="tertiary"
          disabled={isLoadingExhibitorScanBooth}
          className="w-full h-11"
          onClick={() => {}}
        >
          <Calendar size={16} />
          <span>Request 1:1 Meeting</span>
        </Button>
      </div>
    </>
  );
};
