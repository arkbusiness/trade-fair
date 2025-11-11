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
import { exhibitorsQueryKeys } from '../../api/exhibitors-query-options';
import { InviteExhibitorForm } from '../molecules';
import { useEventStatus } from '@/app/core/shared/hooks';

enum ModalType {
  NONE = 'NONE',
  INVITE_EXHIBITOR = 'INVITE_EXHIBITOR'
}

export const OrganizerExhibitorHeader = () => {
  const queryClient = getQueryClient();
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);
  const { isOneDayBeforeEvent } = useEventStatus();

  const handleCloseModal = () => {
    queryClient.invalidateQueries({
      queryKey: [exhibitorsQueryKeys.base]
    });
    setActiveModal(ModalType.NONE);
  };

  return (
    <>
      <EventInviteAlert type="exhibitor" />
      <InviteExhibitorForm
        isOpen={activeModal === ModalType.INVITE_EXHIBITOR}
        onClose={handleCloseModal}
      />
      <DashboardToolbar title="Exhibitors" description="">
        <div className="flex items-center gap-x-[7px]">
          <ExportButton
            apiRoute="/organizer/invites-exhibitors/export"
            exportName="exhibitors"
          />
          <Button
            variant="tertiary"
            className="flex gap-x-[0.63rem]"
            disabled={isOneDayBeforeEvent}
            onClick={() => {
              if (isOneDayBeforeEvent) return;
              setActiveModal(ModalType.INVITE_EXHIBITOR);
            }}
          >
            <Plus size={16} />
            <span>Invite Exhibitor</span>
          </Button>
        </div>
      </DashboardToolbar>
    </>
  );
};
