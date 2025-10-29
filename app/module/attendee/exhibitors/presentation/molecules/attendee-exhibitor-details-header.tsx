'use client';

import { Button, GoBackButton } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { useMessageSlice } from '@/app/core/shared/slice';
import { MessageCircleMore } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { useAttendeeExhibitorScanBooth } from '../../api';

interface AttendeeExhibitorDetailsHeaderProps {
  exhibitorId: string;
}

export const AttendeeExhibitorDetailsHeader = ({
  exhibitorId
}: AttendeeExhibitorDetailsHeaderProps) => {
  const router = useRouter();
  const { setSelectedUserId } = useMessageSlice();
  const { isScanned, isLoadingExhibitorScanBooth } =
    useAttendeeExhibitorScanBooth(exhibitorId);

  const isContactVisible = !isLoadingExhibitorScanBooth && isScanned;

  const handleContactExhibitor = () => {
    setSelectedUserId(exhibitorId);
    router.push(ATTENDEE_APP_ROUTES.messages.root());
  };

  return (
    <div className="flex justify-between items-center gap-5 flex-wrap">
      <GoBackButton
        title="Back to Exhibitors"
        route={ATTENDEE_APP_ROUTES.exhibitors.root()}
      />
      <div className="max-w-[21.56rem] w-full flex flex-wrap gap-2 justify-end">
        {isContactVisible && (
          <Button
            variant="tertiary"
            className="flex gap-x-[0.63rem] rounded-[6px] h-8"
            onClick={handleContactExhibitor}
          >
            <MessageCircleMore size={16} />
            <span>Contact Exhibitor</span>
          </Button>
        )}
      </div>
    </div>
  );
};
