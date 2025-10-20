'use client';

import { GoBackButton, LinkButton } from '@/app/core/shared/components/atoms';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';
import { MessageCircleMore } from 'lucide-react';
import { useAttendeeExhibitorScanBooth } from '../../api';

interface AttendeeExhibitorDetailsHeaderProps {
  exhibitorId: string;
}

export const AttendeeExhibitorDetailsHeader = ({
  exhibitorId
}: AttendeeExhibitorDetailsHeaderProps) => {
  const { isScanned, isLoadingExhibitorScanBooth } =
    useAttendeeExhibitorScanBooth(exhibitorId);

  const isContactVisible = !isLoadingExhibitorScanBooth && isScanned;

  return (
    <div className="flex justify-between items-center gap-5 flex-wrap">
      <GoBackButton
        title="Back to Exhibitors"
        route={ATTENDEE_APP_ROUTES.exhibitors.root()}
      />
      <div className="max-w-[21.56rem] w-full flex flex-wrap gap-2 justify-end">
        {isContactVisible && (
          <LinkButton
            variant="tertiary"
            className="flex gap-x-[0.63rem] rounded-[6px] h-8"
            href={`${ATTENDEE_APP_ROUTES.messages.root()}?exhibitorId=${exhibitorId}`}
          >
            <MessageCircleMore size={16} />
            <span>Contact Exhibitor</span>
          </LinkButton>
        )}
      </div>
    </div>
  );
};
