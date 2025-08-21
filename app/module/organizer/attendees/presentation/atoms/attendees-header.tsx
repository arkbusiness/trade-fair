'use client';

import { Button } from '@/app/core/shared/components/atoms';
import {
  DashboardToolbar,
  IconButton
} from '@/app/core/shared/components/molecules';
import { CsvIcon } from '@/app/core/shared/icons';
import { CloudDownload, Plus } from 'lucide-react';
import { useState } from 'react';
import { getQueryClient } from '@/app/core/shared/lib';
import { organizerAttendeesService } from '../../services';
import { InviteAttendeeForm } from '../molecules';

enum ModalType {
  NONE = 'NONE',
  INVITE_ATTENDEE = 'INVITE_ATTENDEE'
}

export const OrganizerAttendeesHeader = () => {
  const queryClient = getQueryClient();
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const handleCloseModal = () => {
    queryClient.invalidateQueries({
      queryKey: [...organizerAttendeesService.getAttendees().queryKey]
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
          <IconButton variant="outline">
            <CloudDownload size={16} />
            <span>Import</span>
          </IconButton>

          <IconButton variant="outline" className="stroke-foreground">
            <CsvIcon size={16} />
            <span>Export</span>
          </IconButton>
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
