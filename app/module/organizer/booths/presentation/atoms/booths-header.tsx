'use client';

import { Button } from '@/app/core/shared/components/atoms';
import {
  DashboardToolbar,
  IconButton
} from '@/app/core/shared/components/molecules';
import { ExportButton } from '@/app/core/shared/components/organisms/export-button';
import { getQueryClient } from '@/app/core/shared/lib';
import { CloudDownload, Plus } from 'lucide-react';
import { useState } from 'react';
import { boothsService } from '../../services';
import { BoothForm } from '../molecules';

enum ModalType {
  NONE = 'NONE',
  ADD_BOOTH = 'ADD_BOOTH'
}

export const BoothsHeader = () => {
  const queryClient = getQueryClient();
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const closeModal = () => {
    queryClient.invalidateQueries({
      queryKey: [...boothsService.getBooths().queryKey]
    });
    setActiveModal(ModalType.NONE);
  };

  return (
    <>
      <BoothForm
        isOpen={activeModal === ModalType.ADD_BOOTH}
        onClose={closeModal}
        selectedBooth={null}
      />
      <DashboardToolbar title="Manage Booths" description="">
        <div className="flex items-center gap-x-[7px]">
          <IconButton variant="outline">
            <CloudDownload size={16} />
            <span>Import</span>
          </IconButton>

          <ExportButton
            apiRoute={boothsService.exportBooth().url as string}
            exportName="booths"
          />

          <Button
            variant="tertiary"
            className="flex gap-x-[0.63rem]"
            onClick={() => setActiveModal(ModalType.ADD_BOOTH)}
          >
            <Plus size={16} />
            <span>Add Booth</span>
          </Button>
        </div>
      </DashboardToolbar>
    </>
  );
};
