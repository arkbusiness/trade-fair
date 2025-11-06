'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { DashboardToolbar } from '@/app/core/shared/components/molecules';
import { ExportButton } from '@/app/core/shared/components/organisms/export-button';
import { getQueryClient } from '@/app/core/shared/lib';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { InviteAttendeeForm } from '../molecules';
import { attendeesQueryKeys } from '../../api/attendees-query-options';

enum ModalType {
  NONE = 'NONE',
  INVITE_ATTENDEE = 'INVITE_ATTENDEE'
}

export const OrganizerAttendeesHeader = () => {
  const queryClient = getQueryClient();
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const handleCloseModal = () => {
    queryClient.invalidateQueries({
      queryKey: [attendeesQueryKeys.base]
    });
    setActiveModal(ModalType.NONE);
  };

  return (
    <>
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
            onClick={() => setActiveModal(ModalType.INVITE_ATTENDEE)}
          >
            <Plus size={16} />
            <span>Invite Attendee</span>
          </Button>
        </div>
      </DashboardToolbar>
    </>
  );
};
