'use client';

import { Button } from '@/app/core/shared/components/atoms';
import { DashboardToolbar } from '@/app/core/shared/components/molecules';
import { ExportButton } from '@/app/core/shared/components/organisms/export-button';
import { getQueryClient } from '@/app/core/shared/lib';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { boothsService } from '../../services';
import { BoothForm } from '../molecules';
import { ImportBoothForm } from '../organisms';

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
          <ImportBoothForm
            onSuccess={() => {
              closeModal();
            }}
            sampleFileUrl="/csv-sample/booth-sample.csv"
          />

          <ExportButton
            apiRoute="/organizer/booths/export"
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
