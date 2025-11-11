'use client';

import { Button } from '@/app/core/shared/components/atoms';
import {
  DashboardToolbar,
  EventInviteAlert
} from '@/app/core/shared/components/molecules';
import { ExportButton } from '@/app/core/shared/components/organisms/export-button';
import { getQueryClient } from '@/app/core/shared/lib';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { InviteAttendeeForm } from '../molecules';
import { attendeesQueryKeys } from '../../api/attendees-query-options';
import { useEventStatus } from '@/app/core/shared/hooks';

enum ModalType {
  NONE = 'NONE',
  INVITE_ATTENDEE = 'INVITE_ATTENDEE'
}

export const OrganizerAttendeesHeader = () => {
  const queryClient = getQueryClient();
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const { isEventConcluded } = useEventStatus();

  const handleCloseModal = () => {
    queryClient.invalidateQueries({
      queryKey: [attendeesQueryKeys.base]
    });
    setActiveModal(ModalType.NONE);
  };

  return (
    <>
      <EventInviteAlert type="attendee" />
      <InviteAttendeeForm
        isOpen={activeModal === ModalType.INVITE_ATTENDEE}
        onClose={handleCloseModal}
      />
      <DashboardToolbar title="Attendees" description="">
        <div className="flex items-center gap-x-[7px]">
          <ExportButton
            apiRoute="/organizer/invites-attendees/export"
            exportName="attendees"
          />
          <Button
            variant="tertiary"
            className="flex gap-x-[0.63rem]"
            disabled={isEventConcluded}
            onClick={() => {
              if (isEventConcluded) return;
              setActiveModal(ModalType.INVITE_ATTENDEE);
            }}
          >
            <Plus size={16} />
            <span>Invite Attendee</span>
          </Button>
        </div>
      </DashboardToolbar>
    </>
  );
};
