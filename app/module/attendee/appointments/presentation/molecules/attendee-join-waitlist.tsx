'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { useAttendeeJoinWaitingList } from '../../api';
import { errorHandler } from '@/app/core/shared/utils';
import toast from 'react-hot-toast';
import { LoadingButton, Modal } from '@/app/core/shared/components/molecules';
import { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { ATTENDEE_APP_ROUTES } from '@/app/core/shared/constants';

interface AttendeeJoinWaitlistProps {
  isLoadingSlots: boolean;
  hasSlots: boolean;
  exhibitorId: string;
}

export const AttendeeJoinWaitlist = ({
  isLoadingSlots,
  hasSlots,
  exhibitorId
}: AttendeeJoinWaitlistProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { joinWaitingListMutation, isPending } = useAttendeeJoinWaitingList({
    exhibitorId,
    onSuccess: () => {
      toast.success('You have been added to the waitlist');
      router.push(ATTENDEE_APP_ROUTES.meetings.root());
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(errorHandler(error));
    }
  });

  return (
    <>
      {!isLoadingSlots && !hasSlots && (
        <div className="text-center py-8">
          <div className="mb-4">
            <p className="mb-2 text-lg text-foreground font-semibold">
              No available meeting slots at this time
            </p>
            <p className="text-secondary">
              Join the waitlist to be notified when new slots become available
            </p>
          </div>
          <Button
            variant="tertiary"
            onClick={() => setIsOpen(true)}
            className="px-6"
          >
            Join Waitlist
          </Button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Join waitlist"
        description=""
        contentClassName="px-0 pb-0 overflow-hidden max-w-[500px] sm:max-w-[524px]"
        headerClassName="px-6"
      >
        <div className="flex flex-col gap-[1.86rem] w-full text-left relative mt-8 justify-center items-center">
          <div className="px-8">
            <p>Join waitlist to be notified when new slots become available</p>
          </div>
          <div className="mt-[10.19rem] w-full flex justify-between bg-gray-light-3 py-5 px-6">
            <Button
              variant="outline"
              className="gap-[0.5rem] flex items-center h-8"
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              <span>Cancel</span>
            </Button>

            <LoadingButton
              variant="tertiary"
              className="gap-[0.5rem] flex items-center h-8"
              type="submit"
              isLoading={isPending}
              disabled={isPending}
              onClick={joinWaitingListMutation}
            >
              <span>Join waitlist</span>
            </LoadingButton>
          </div>
        </div>
      </Modal>
    </>
  );
};
