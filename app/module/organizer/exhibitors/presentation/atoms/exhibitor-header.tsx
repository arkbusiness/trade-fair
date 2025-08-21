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
import { InviteExhibitorForm } from '../molecules';
import { organizerExhibitorsService } from '../../services';

enum ModalType {
  NONE = 'NONE',
  INVITE_EXHIBITOR = 'INVITE_EXHIBITOR'
}

export const OrganizerExhibitorHeader = () => {
  const queryClient = getQueryClient();
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const handleCloseModal = () => {
    queryClient.invalidateQueries({
      queryKey: [...organizerExhibitorsService.getExhibitors().queryKey]
    });
    setActiveModal(ModalType.NONE);
  };

  return (
    <>
      <InviteExhibitorForm
        isOpen={activeModal === ModalType.INVITE_EXHIBITOR}
        onClose={handleCloseModal}
      />
      <DashboardToolbar title="Exhibitors" description="">
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
            onClick={() => setActiveModal(ModalType.INVITE_EXHIBITOR)}
          >
            <Plus size={16} />
            <span>Invite Exhibitor</span>
          </Button>
        </div>
      </DashboardToolbar>
    </>
  );
};
