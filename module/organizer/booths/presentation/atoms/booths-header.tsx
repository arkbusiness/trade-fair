'use client';

import { Button } from '@/app/core/shared/components/atoms';
import {
  DashboardToolbar,
  IconButton
} from '@/app/core/shared/components/molecules';
import { CsvIcon } from '@/app/core/shared/icons';
import { CloudDownload, Plus } from 'lucide-react';
import { useState } from 'react';

enum ModalType {
  NONE = 'NONE',
  ADD_BOOTH = 'ADD_BOOTH'
}

export const BoothsHeader = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  console.log(activeModal);

  // const closeModal = () => {
  //   setActiveModal(ModalType.NONE);
  // };

  return (
    <>
      {/* {isRefetchingInventory && <OverlaySpinner />}
      <Suspense>
        <InventoryFormModal
          isOpen={ModalType.CREATE_INVENTORY === activeModal}
          onClose={closeModal}
        />
      </Suspense>
      <Suspense>
        <CategoryManagement
          isOpen={ModalType.MANAGE_CATEGORIES === activeModal}
          onClose={closeModal}
        />
      </Suspense> */}
      <DashboardToolbar title="Manage Booths" description="">
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
